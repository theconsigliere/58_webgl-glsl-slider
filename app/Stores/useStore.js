import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export default create(
  subscribeWithSelector((set) => {
    const images = [
      {
        src: "/images/1.jpg",
        title: "Espresso",
      },
      {
        src: "/images/2.jpg",
        title: "Margarita",
      },
      {
        src: "/images/3.jpg",
        title: "Mojito",
      },
      {
        src: "/images/4.jpg",
        title: "Old Fashioned",
      },
      {
        src: "/images/5.jpg",
        title: "Pina Colada",
      },
      {
        src: "/images/1.jpg",
        title: "Whiskey Sour",
      },
      {
        src: "/images/2.jpg",
        title: "Negroni",
      },
      {
        src: "/images/3.jpg",
        title: "Mai Tai",
      },
      {
        src: "/images/5.jpg",
        title: "Pina Colada",
      },
    ]

    return {
      //images
      images: images,
      // set imagesLength to images.length using zustand
      imagesLength: images.length,
      activeIndex: 0,
      setActiveIndex: (number) => set((state) => ({ activeIndex: number })),

      //GALLERY
      gallerySlideWidth: 1,
      setGallerySlideWidth: (number) => {
        set((state) => ({ gallerySlideWidth: number }))
      },
      gallerySlideMargin: 1.5,
      setGallerySlideMargin: (number) => {
        set((state) => ({ gallerySlideMargin: number }))
      },
      galleryPositions: new Array(images.length).fill([0, 0, 0]),

      setGalleryPositions: () => {
        set((state) => {
          images.map((image, index) => {
            state.galleryPositions[index] = [
              index * (state.gallerySlideWidth + state.gallerySlideMargin),
              0,
              0,
            ]
          })

          return state.galleryPositions
        })
      },

      //GRID
      gridSlideMargin: 0.45,
      setGridSlideMargin: (number) => set((state) => ({ gridMargin: number })),
      gridSlideWidth: 1,
      setGridSlideWidth: (number) => {
        set((state) => ({ gridSlideWidth: number }))
      },
      gridColumns: 3,
      setGridColumns: (number) => {
        set((state) => ({ gridColumns: number }))
      },
      gridPositions: new Array(images.length).fill([0, 0, 0]),
      setGridPositions: () => {
        set((state) => {
          const columns = state.gridColumns
          const rows = Math.ceil(state.images.length / columns)

          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              const index = i * columns + j

              //  minus the width of the slide and margin so it starts at top left not in center
              state.gridPositions[index] = [
                j * (state.gridSlideWidth + state.gridSlideMargin) -
                  (state.gridSlideWidth + state.gridSlideMargin), // x

                state.gridSlideWidth +
                  state.gridSlideMargin -
                  (state.gridSlideWidth + state.gridSlideMargin) * i, // y
                0,
              ]
            }
          }

          return state.gridPositions
        })
      },

      //Selector
      phase: "gallery",
      previousPhase: null,
      setPreviousPhase: (newPhase) => {
        set((state) => ({ previousPhase: newPhase }))
      },
      runUseFrame: true,
      setRunUseFrame: (bool) => {
        set((state) => ({ runUseFrame: bool }))
      },

      setGrid: () => {
        set((state) => {
          if (state.phase === "gallery") return { phase: "grid" }

          return {}
        })
      },
      setGallery: () => {
        set((state) => {
          if (state.phase === "grid") return { phase: "gallery" }
          return {}
        })
      },
    }
  })
)
