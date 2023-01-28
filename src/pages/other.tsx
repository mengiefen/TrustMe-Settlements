import { useDispatch, useSelector } from "react-redux"
import { wrapper } from "../redux/store"
import { increment } from "../redux/counterSlice"
import { addUser } from "../redux/userSlice"
import { RootState } from "../redux/store"
import Spinner from "../components/elements/Spinner"

const Other = () => {
  const dispatch = useDispatch()
  const count = useSelector((state: RootState) => state.counter.count)
  const user = useSelector((state: RootState) => state.user)

  const handleClick = () => {
    dispatch(
      addUser({
        id: Math.floor(Math.random() * 100 + 1),
        name: "John Doe",
      })
    )
    dispatch(increment())
  }

  return (
    <div>
      <Spinner />
      <h1>Count is {count}</h1>
      <button onClick={() => handleClick()}>Increment</button>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store): any => async () => {
  store.dispatch(increment())

  const response = await fetch(`https://reqres.in/api/users/${Math.floor(Math.random() * 10 + 1)}`)
  const { data } = await response.json()
  store.dispatch(
    addUser({
      id: data.id,
      name: data.first_name + " " + data.last_name,
    })
  )
})

export default Other
