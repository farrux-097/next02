"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState, useEffect } from "react"
import { memo } from "react"

type User = {
  id?: string
  firstName: string
  lastName: string
  region: string
  gender: string
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    region: yup.string().required(),
    gender: yup.string().required(),
  
  })
  .required()


const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
 const onSubmit = async (data: User) => {
    try {
      const res = await fetch("https://689d9930ce755fe697892b85.mockapi.io/exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const newUser = await res.json()
      setUsers((prev) => [...prev, newUser])
      reset()
    } catch (err) {
      console.error("Error creating user:", err)
    }
  }

    const fetchUsers = async () => {
    setLoading(true)
    const res = await fetch("https://689d9930ce755fe697892b85.mockapi.io/exam")
    const data = await res.json()
    setUsers(data)
    setLoading(false)
  }
  const handleDelete = async (id: string) => {
    await fetch(`https://689d9930ce755fe697892b85.mockapi.io/exam/${id}`, {
      method: "DELETE",
    })
    setUsers(users.filter((u) => u.id !== id))
  }
  const handleUpdate = async (id: string) => {
    const res = await fetch(`https://689d9930ce755fe697892b85.mockapi.io/exam/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ region: "Updated Region" }),
    })
    const updated = await res.json()
    setUsers(users.map((u) => (u.id === id ? updated : u)))
  }


  useEffect(() => {
    fetchUsers()
  }, [])



  return (
    <div className="container">
      <div className="w-[410px] p-1 border border-slate-400 rounded-md shadow-md">
             <form onSubmit={handleSubmit(onSubmit)} className="w-[400px] flex items-center flex-wrap gap-1">
      <input placeholder="First Name"  className="w-full border border-slate-300 shadow-md rounded-md py-1 outline-none p-3" {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <input placeholder="Last Name" className="w-full border border-slate-300 shadow-md rounded-md py-1 outline-none p-3"  {...register("lastName")} />
      <p>{errors.lastName?.message}</p>

      <select className="w-full border border-slate-300 shadow-md rounded-md py-1 outline-none p-3" {...register("region")} >
          <option disabled value="">Select region</option>
           <option value="Tashkent">Tashkent</option>
          <option value="Samarkand">Samarkand</option>
          <option value="Bukhara">Bukhara</option>
          <option value="Andijan">Andijan</option>
           <option value="Namangan">Namangan</option>
           <option value="Fergana">Fergana</option>
          <option value="Khorezm">Khorezm</option>
          <option value="Navoiy">Navoiy</option>
          <option value="Jizzakh">Jizzakh</option>
          <option value="Kashkadarya">Kashkadarya</option>
           <option value="Surkhandarya">Surkhandarya</option>
          <option value="Sirdarya">Sirdarya</option>
          <option value="Karakalpakstan">Karakalpakstan</option>
      </select>
      <p>{errors.region?.message}</p>

     <select className="w-full border border-slate-300 shadow-md rounded-md py-1 outline-none p-3" {...register("gender")}>
        <option value="" disabled>Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
    </select>
      <p>{errors.gender?.message}</p>


      <input type="submit" className=" w-[60px] bg-green-500 text-white p-1  rounded-md" />
            </form>
      </div>
  <div className="mt-5 mb-5">
  <h2 className="text-2xl font-bold mb-4">User List</h2>

  {loading ? (
    <p className="text-gray-500">Loading...</p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((u) => (
        <div
          key={u.id}
          className="p-6 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            {u.firstName} {u.lastName}
          </h3>
          <p className="text-gray-600">
            <span className="font-medium">Region:</span> {u.region}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Gender:</span> {u.gender}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleUpdate(u.id!)}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(u.id!)}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  )
}

export default memo(SignUp)