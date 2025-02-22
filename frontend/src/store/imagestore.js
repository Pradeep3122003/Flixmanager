import { create } from "zustand";

export const useImagestore = create((set) => ({
    images: [],
    setImages: (images) => set({ images }),
    createImage: async (newImage) => {
        if(!newImage.name || !newImage.date || !newImage.image){
            return {success:false, message:"Please fill in all fields"}
        }
        const res = await fetch("/api/images",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newImage)
        })
        const data = await res.json();
        set((state) => ({images:[...state.images, data.data]}));
        return { success: true, message: "Image stored succesfully"};
    },
    fetchImages: async () => {
        const res = await fetch("/api/images")
        const data = await res.json();
        set({images: data.data})
    },
    deleteImage: async (pid) => {
        const res = await fetch(`/api/images/${pid}`,{
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message};
        set(state => ({ images: state.images.filter(image => image._id !== pid)}));
        return { success: true, message: data.message}
    },
    updateImage: async (pid, updatedImage) => {
        const res = await  fetch(`/api/images/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedImage),
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message};

        set((state) => ({
            images: state.images.map((image) =>
                image._id === pid ? { ...image, ...updatedImage } : image
            ),
        }));

        return { success: true, message: data.message};
    }
}));