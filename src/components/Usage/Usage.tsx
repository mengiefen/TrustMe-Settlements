import useWindowSize from "@/hooks/useWindowSize"
import React from "react"
import { Chrono } from "react-chrono"
import { TimelineItemModel } from "react-chrono/dist/models"

export const Usage = () => {
  const items: TimelineItemModel[] = [
    {
      title: "STEP 1",
      cardTitle: "Entering Transaction Details",
      cardSubtitle: "One party enters the transaction details",
      cardDetailedText:
        "In this step, one of the parties involved in the transaction enters all the relevant details of the transaction, such as the type of asset being traded, the quantity, and the agreed-upon terms. This information is then sent to the counterparty for confirmation.",
    },
    {
      title: "STEP 2",
      cardTitle: "Confirming the Transaction",

      cardSubtitle: "   The counterparty confirms the transaction",
      cardDetailedText:
        "In this step, the counterparty reviews the details of the transaction and confirms their agreement to the terms. This confirms that both parties are in agreement and ready to proceed with the asset exchange.",
    },

    {
      title: "STEP 3",
      cardTitle: "   The assets of both parties are exchanged simultaneously - settled!",

      cardSubtitle: "The assets of both parties are exchanged simultaneously - settled!",
      cardDetailedText:
        "Once the transaction has been confirmed, both parties' assets are exchanged simultaneously. This means that the assets are transferred from one party to the other, and the transaction is considered settled.",
    },

    {
      title: "STEP 4",
      cardTitle: "Withdrawing Assets in Case of Failure to Confirm",
      cardSubtitle:
        "If the counterparty fails to confirm, the first party can withdraw its assets - safe!",
      cardDetailedText:
        "If, for any reason, the counterparty fails to confirm the transaction, the first party has the option to withdraw their assets. This ensures that their assets are safe and protected in case of any unexpected issues.",
    },
  ]

  const { width } = useWindowSize()

  return (
    <div className="my-12 md:mb-20 sm:shadow-[0px_-12px_500px_0px] sm:shadow-secondary-900 rounded pb:10 md:pb-20">
      <h2 className=" p-5 text-2xl text-center text-text  tracking-wider leading-10 md:text-start md:text-3xl md:font-semibold mb-5 md:mb:10">
        How to Use
      </h2>

      <div
        className=""
        style={{
          width: "100%",
          backgroundColor: "transparent",
          color: "white",
        }}
      >
        <Chrono
          items={items}
          mode={width > 992 ? "VERTICAL_ALTERNATING" : "VERTICAL"}
          allowDynamicUpdate
          lineWidth={3}
          mediaHeight={0}
          theme={{
            primary: "#02b6ce",
            secondary: "#9a5cb0",
            cardBgColor: "linear-gradient(45deg, #03272c 0%, #240330 80%)",
            cardForeColor: "white",
            textColor: "white",
            titleColor: "white",
            titleColorActive: "cyan",
          }}
          hideControls
          borderLessCards={false}
        />
      </div>
    </div>
  )
}
