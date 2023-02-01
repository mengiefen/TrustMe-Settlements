import React from "react"
import { Chrono } from "react-chrono"
import { TimelineItemModel } from "react-chrono/dist/models"

export const Usage = () => {
  const items: TimelineItemModel[] = [
    {
      title: "NFT to NFT",
      cardTitle: "Token to Currency",
      url: "http://www.history.com",
      cardSubtitle: "Lore ipsum dolor sit amet consectetur adipisicing elit",
      cardDetailedText:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. In ut nulla modi ipsam magnam eligendi asperiores consectetur dolorum architecto quibusdam nemo animi ullam repudiandae et labore iusto nam laborum eaque, tempora voluptate ratione. Beatae quidem in nisi repellendus. Omnis voluptas quasi autem blanditiis numquam animi eum deleniti repellendus neque quibusdam. Aperiam incidunt quod quis perferendis corrupti praesentium ad reiciendis? Labore natus corporis temporibus recusandae. Maiores consequuntur officia earum doloribus, dicta, fuga voluptas a nihil quibusdam error nulla in rerum pariatur repudiandae? Corrupti quidem accusantium reprehenderit sequi ipsam consequuntur aliquid explicabo, velit at ea atque a, rerum possimus, maxime tempora esse.",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someurl/image.jpg",
        },
      },
    },
    {
      title: "CURRENCY TO CURRENCY",
      cardTitle: "NFT to NFT",
      url: "http://www.history.com",
      cardSubtitle: "Lore ipsum dolor sit amet consectetur adipisicing elit",
      cardDetailedText:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. In ut nulla modi ipsam magnam eligendi asperiores consectetur dolorum architecto quibusdam nemo animi ullam repudiandae et labore iusto nam laborum eaque, tempora voluptate ratione. Beatae quidem in nisi repellendus. Omnis voluptas quasi autem blanditiis numquam animi eum deleniti repellendus neque quibusdam. Aperiam incidunt quod quis perferendis corrupti praesentium ad reiciendis? Labore natus corporis temporibus recusandae. Maiores consequuntur officia earum doloribus, dicta, fuga voluptas a nihil quibusdam error nulla in rerum pariatur repudiandae? Corrupti quidem accusantium reprehenderit sequi ipsam consequuntur aliquid explicabo, velit at ea atque a, rerum possimus, maxime tempora esse.",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someurl/image.jpg",
        },
      },
    },

    {
      title: "TOKEN TO TOKEN",
      cardTitle: "Token to Token",
      url: "http://www.history.com",
      cardSubtitle: "Lore ipsum dolor sit amet consectetur adipisicing elit",
      cardDetailedText:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. In ut nulla modi ipsam magnam eligendi asperiores consectetur dolorum architecto quibusdam nemo animi ullam repudiandae et labore iusto nam laborum eaque, tempora voluptate ratione. Beatae quidem in nisi repellendus. Omnis voluptas quasi autem blanditiis numquam animi eum deleniti repellendus neque quibusdam. Aperiam incidunt quod quis perferendis corrupti praesentium ad reiciendis? Labore natus corporis temporibus recusandae. Maiores consequuntur officia earum doloribus, dicta, fuga voluptas a nihil quibusdam error nulla in rerum pariatur repudiandae? Corrupti quidem accusantium reprehenderit sequi ipsam consequuntur aliquid explicabo, velit at ea atque a, rerum possimus, maxime tempora esse.",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someurl/image.jpg",
        },
      },
    },

    {
      title: "NFT TO TOKEN",
      cardTitle: "NFT to Token",
      url: "http://www.history.com",
      cardSubtitle: "Lore ipsum dolor sit amet consectetur adipisicing elit",
      cardDetailedText:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. In ut nulla modi ipsam magnam eligendi asperiores consectetur dolorum architecto quibusdam nemo animi ullam repudiandae et labore iusto nam laborum eaque, tempora voluptate ratione. Beatae quidem in nisi repellendus. Omnis voluptas quasi autem blanditiis numquam animi eum deleniti repellendus neque quibusdam. Aperiam incidunt quod quis perferendis corrupti praesentium ad reiciendis? Labore natus corporis temporibus recusandae. Maiores consequuntur officia earum doloribus, dicta, fuga voluptas a nihil quibusdam error nulla in rerum pariatur repudiandae? Corrupti quidem accusantium reprehenderit sequi ipsam consequuntur aliquid explicabo, velit at ea atque a, rerum possimus, maxime tempora esse.",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someurl/image.jpg",
        },
      },
    },
  ]

  return (
    <div className="my-12 md:mb-20">
      <h2 className="text-2xl text-center text-text  tracking-wider leading-10 md:text-start md:text-3xl md:font-semibold">
        How to Use
      </h2>
      {/* <hr className="border-2 border-secondary-500 w-[20%] md:w-10 mr-auto md:mb-5" /> */}

      <div
        style={{
          width: "100%",
          backgroundColor: "transparent",
          color: "white",
        }}
      >
        <Chrono
          items={items}
          mode="VERTICAL_ALTERNATING"
          allowDynamicUpdate
          cardHeight={100}
          lineWidth={3}
          theme={{
            primary: "#02b6ce",
            secondary: "#9a5cb0",
            cardBgColor: "linear-gradient(90deg, #03272c 0%, #240330 100%)",
            cardForeColor: "white",
            textColor: "white",
            titleColor: "white",
            titleColorActive: "cyan",
          }}
          hideControls
          borderLessCards={true}
        />
      </div>
    </div>
  )
}
