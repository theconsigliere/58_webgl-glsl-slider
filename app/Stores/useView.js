import { create } from "zustand"

export default create(
  subscribeWithSelector((set) => {
    return {
      //global state
      gallerySlideWidth: 1,
      setGallerySlideWidth: (gallerySlideWidth) =>
        set((state) => ({ gallerySlideWidth })),
      galleryMargin: 0.45,
      setGalleryMargin: (margin) => set((state) => ({ galleryMargin })),
      activeIndex: 0,
      setActiveIndex: (activeIndex) => set((state) => ({ activeIndex })),
      gridMargin: 0.45,
      setGridMargin: (gridMargin) => set((state) => ({ gridMargin })),
      gridSlideWidth: 1,
      setGridSlideWidth: (gridSlideWidth) =>
        set((state) => ({ gridSlideWidth })),

      images: [
        {
          src: "/images/1.jpg",
          title: "Dirty Martini",
          galleryPosition: [0, 0, 0],
          gridPosition: [0, 0, 0],
        },
        {
          src: "/images/2.jpg",
          title: "Margarita",
          galleryPosition: [0, 0, 0],
          gridPosition: [0, 0, 0],
        },
        {
          src: "/images/3.jpg",
          title: "Mojito",
          galleryPosition: [0, 0, 0],
          gridPosition: [0, 0, 0],
        },
        {
          src: "/images/4.jpg",
          title: "Old Fashioned",
          galleryPosition: [0, 0, 0],
          gridPosition: [0, 0, 0],
        },
        {
          src: "/images/5.jpg",
          title: "Pina Colada",
          galleryPosition: [0, 0, 0],
          gridPosition: [0, 0, 0],
        },
        {
          src: "/images/1.jpg",
          title: "Whiskey Sour",
          galleryPosition: [0, 0, 0],
          gridPosition: [0, 0, 0],
        },
        {
          src: "/images/2.jpg",
          title: "Negroni",
          galleryPosition: [0, 0, 0],
          gridPosition: [0, 0, 0],
        },
        {
          src: "/images/3.jpg",
          title: "Mai Tai",
          galleryPosition: [0, 0, 0],
          gridPosition: [0, 0, 0],
        },
        {
          src: "/images/5.jpg",
          title: "Pina Colada",
          galleryPosition: [0, 0, 0],
          gridPosition: [0, 0, 0],
        },
      ],
      count: images.length,
    }

    // }
    // })
  })
)
