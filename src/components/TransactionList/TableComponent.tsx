import { useTable } from "react-table"
import React, { ReactElement, useMemo } from "react"
import { Column } from "react-table"
import { MdOutlineArrowForward } from "react-icons/md"
import { FaSearch, FaUserCircle } from "react-icons/fa"
import TradeStatus from "../elements/TradeStatus"
import Pagination from "./Pagination"

const CompletedStatus = <TradeStatus status="Completed" />
const PendingStatus = (
  <TradeStatus status="Pending" style="bg-yellow-100 border-yellow-700 text-yellow-900" />
)
const CanceledStatus = (
  <TradeStatus status="Canceled" style="  bg-red-100 text-red-600 border-red-400" />
)

const ArrowRight = (
  <MdOutlineArrowForward className="text-secondary-900 hover:translate-x-[1px] transition duration-300" />
)

const UserCircle = (
  <FaUserCircle className="text-secondary-900 hover:translate-x-[1px] transition duration-300 w-[40px] h-[40px]" />
)

const TableComponent = () => {
  const data = useMemo(
    () => [
      {
        col1: UserCircle,
        col2: "0x4...4f56",
        col3: "2,54.00",
        col4: CompletedStatus,
        col5: ArrowRight,
      },
      {
        col1: UserCircle,
        col2: "0x4...4f56",
        col3: "2,54.00",
        col4: PendingStatus,
        col5: ArrowRight,
      },
      {
        col1: UserCircle,
        col2: "0x4...4f56",
        col3: "2,54.00",
        col4: CanceledStatus,
        col5: ArrowRight,
      },
      {
        col1: UserCircle,
        col2: "0x4...4f56",
        col3: "2,54.00",
        col4: CompletedStatus,
        col5: ArrowRight,
      },
    ],
    []
  )

  const columns = useMemo<
    Column<{
      col1: ReactElement
      col2: string
      col3: string
      col4: ReactElement
      col5: ReactElement
    }>[]
  >(
    () => [
      {
        Header: "Receiver",
        accessor: "col1",
      },
      {
        Header: "Token Sym",
        accessor: "col2",
      },

      {
        Header: "Amount",
        accessor: "col3",
      },
      {
        Header: "Status",
        accessor: "col4",
      },
      {
        Header: "",
        accessor: "col5",
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <div className="w-full mt-5">
      <h2 className="text-xl font-semibold text-secondary-900 uppercase mb-3 tracking-wide">
        Settlements
      </h2>
      <div className="relative h-10 mb-2">
        <input
          type="text"
          className="w-full h-full pl-10 pr-4 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
        />
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-secondary-200" />
      </div>

      <h2 className="text-xl font-semibold text-secondary-900 my-2">Sender Settlements</h2>

      <table {...getTableProps()} className="w-full text-sm text-left ">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={index}
              className="border-b-2 border-secondary-800"
            >
              {headerGroup.headers.map((column, idx) => (
                <th
                  {...column.getHeaderProps()}
                  className="text-xs text-gray-700 uppercase py-3 bg-text font-bold tracking-wider text-center shadow"
                  key={idx}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                key={index}
                className="bg-text border-b-[0.5px] border-secondary-100 hover:bg-secondary-50 rounded"
              >
                {row.cells.map((cell, idx) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-2 py-3 my-2"
                      key={idx}
                      style={{ borderSpacing: "10px" }}
                    >
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <Pagination />

      <h2 className="text-xl font-semibold text-secondary-900 my-5">Receiver Settlements</h2>

      <table {...getTableProps()} className="w-full text-sm text-left ">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={index}
              className="border-b-2 border-secondary-800"
            >
              {headerGroup.headers.map((column, idx) => (
                <th
                  {...column.getHeaderProps()}
                  className="text-xs text-gray-700 uppercase py-3 bg-text font-bold tracking-wider text-center shadow"
                  key={idx}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                key={index}
                className="bg-text border-b-[0.5px] border-secondary-100 hover:bg-secondary-50 rounded mb-5"
              >
                {row.cells.map((cell, idx) => {
                  return (
                    <td {...cell.getCellProps()} className="px-2 py-3" key={idx}>
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <Pagination />
    </div>
  )
}

export default TableComponent
