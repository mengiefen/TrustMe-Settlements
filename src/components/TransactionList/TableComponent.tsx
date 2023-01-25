import { useTable } from "react-table"
import { ReactElement, useMemo } from "react"
import { Column } from "react-table"
import { MdOutlineArrowForward } from "react-icons/md"
import { FaUserCircle } from "react-icons/fa"

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
        col2: "World",
        col3: "Hello",
        col4: "World",
        col5: ArrowRight,
      },
      {
        col1: UserCircle,
        col2: "rocks",
        col3: "Hello",
        col4: "World",
        col5: ArrowRight,
      },
      {
        col1: UserCircle,
        col2: "you want",
        col3: "Hello",
        col4: "World",
        col5: ArrowRight,
      },
      {
        col1: UserCircle,
        col2: "World",
        col3: "Hello",
        col4: "World",
        col5: ArrowRight,
      },
      {
        col1: UserCircle,
        col2: "rocks",
        col3: "Hello",
        col4: "World",
        col5: ArrowRight,
      },
      {
        col1: UserCircle,
        col2: "you want",
        col3: "Hello",
        col4: "World",
        col5: ArrowRight,
      },
    ],
    []
  )

  const columns = useMemo<
    Column<{ col1: ReactElement; col2: string; col3: string; col4: string; col5: ReactElement }>[]
  >(
    () => [
      {
        Header: "User",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "TX ID",
        accessor: "col2",
      },

      {
        Header: "Amount",
        accessor: "col3", // accessor is the "key" in the data
      },
      {
        Header: "Status",
        accessor: "col4",
      },
      {
        Header: "",
        accessor: "col5", // accessor is the "key" in the data
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <div className="w-full mt-12">
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
                  className="text-xs text-gray-700 uppercase px-2 py-3 bg-text font-bold tracking-wide"
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
    </div>
  )
}

export default TableComponent
