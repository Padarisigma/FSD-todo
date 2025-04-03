import { useState } from 'react'
import { Table, TableCell, TableRow } from '../../shared/ui/table/table'
import { IUser } from '../../entities/table-user/model/types'
import { users } from '../../entities/table-user/model/data'
import { addUser } from '../../entities/service/add'
import Button from '../../shared/ui/button'
import ThemeToggle from '../../shared/ui/theme'
import ToolBar from '../../features/table-user/toolbar'

export default function TableUser() {
	const [data, setData] = useState<IUser[]>(users)
	const [addName, setAddName] = useState<string>('')
	const [addEmail, setAddEmail] = useState<string>('')
	const [addStatus, setAddStatus] = useState<boolean>(false)
	const [addCity, setAddCity] = useState<string>('')
	const [addPhone, setAddPhone] = useState<string>('')
	const [addSurName, setAddSurName] = useState<string>('')

	const [editName, setEditName] = useState<string>('')
	const [editEmail, setEditEmail] = useState<string>('')
	const [editStatus, setEditStatus] = useState<boolean>(false)
	const [editCity, setEditCity] = useState<string>('')
	const [editPhone, setEditPhone] = useState<string | number>('')
	const [editSurName, setEditSurName] = useState<string>('')
	const [editUsingId, setEditUsingId] = useState<number | null>(null)

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [isEditOpen, setIsEditOpen] = useState<boolean>(false)

	const [filteredData, setFilteredData] = useState<IUser[]>([])
	const [statusFilter, setStatusFilter] = useState('All')
	const [cityFilter, setCityFilter] = useState('All')
	const [search, setSearch] = useState('')

	const handleSave = () => {
		const newUser = {
			id: Date.now(),
			name: addName,
			surname: addSurName,
			email: addEmail,
			status: addStatus,
			city: addCity,
			phone: addPhone,
		}
		setData(addUser(data, newUser))
		setAddName('')
		setAddEmail('')
		setAddStatus(false)
		setAddCity('')
		setAddPhone('')
		setAddSurName('')
		setIsModalOpen(false)
	}

	const handleEdit = (user: IUser) => {
		setEditName(user.name)
		setEditEmail(user.email)
		setEditCity(user.city)
		setEditStatus(user.status)
		setEditSurName(user.surname)
		setEditPhone(user.phone)
		setEditUsingId(Number(user.id))
		setIsEditOpen(true)
	}

	const handleUpdate = () => {
		if (editUsingId) {
			const updatedData = data.map(user =>
				user.id === editUsingId
					? {
							id: user.id,
							name: editName,
							email: editEmail,
							city: editCity,
							status: editStatus,
							surname: editSurName,
							phone: editPhone,
					  }
					: user
			)
			setData(updatedData)
			setIsEditOpen(false)
			setEditName('')
			setEditEmail('')
			setEditStatus(false)
			setEditCity('')
			setEditPhone('')
			setEditSurName('')
			setEditUsingId(null)
		}
	}

	const handleDelete = (id: number | string) => {
		setData(data.filter(user => user.id !== id))
	}

	return (
		<>
		<div className='w-[90%] m-auto flex justify-between items-center'>
			<h1 className='mt-2 font-semibold text-[33px] hover:bg-gray-200'>
				TABLE USERS
				<span className='text-purple-800 font-bold'> FSD</span>
			</h1>
			<div className='flex gap-[10px] items-center'>
				<Button
					onClick={() => setIsModalOpen(true)}
					color='primary'
					size='medium'
					sx='font-bold rounded-md text-white'
				>
					Add User
				</Button>
			</div>
		</div>
			<div className='flex items-center'>
				<ToolBar
					data={data}
					setFilteredData={setFilteredData}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					cityFilter={cityFilter}
					setCityFilter={setCityFilter}
					search={search}
					setSearch={setSearch}
				/>
			</div>
			<Table className='w-[90%] mt-[20px] m-auto '>
				<TableRow className='border-b-[2px] border-gray-600'>
					<TableCell className='p-[5px]'>
						<h2 className='font-bold'>Name</h2>
					</TableCell>
					<TableCell className='p-[5px]'>
						<h2 className='font-bold'>SurName</h2>
					</TableCell>
					<TableCell className='p-[5px]'>
						<h2 className='font-bold text-center mr-[130px]'>Email</h2>
					</TableCell>
					<TableCell className='p-[5px]'>
						<h2 className='font-bold'>Phone</h2>
					</TableCell>
					<TableCell className='p-[5px]'>
						<h2 className='font-bold'>Status</h2>
					</TableCell>
					<TableCell className='p-[5px]'>
						<h2 className='font-bold'>City</h2>
					</TableCell>
					<TableCell className='p-[5px]'>
						<h2 className='font-bold text-center'>Actions</h2>
					</TableCell>
				</TableRow>
				{filteredData.map((user: IUser) => (
					<TableRow key={user.id} className='border-b-[2px] border-gray-600 font-bold'>
						<TableCell className='p-[10px] border-b-[1px] border-gray-300'>
							{user.name}
						</TableCell>
						<TableCell className='p-[10px] border-b-[1px] border-gray-300'>
							{user.surname}
						</TableCell>
						<TableCell className='p-[10px] b text-centerorder-b-[1px] border-gray-300'>
							{user.email}
						</TableCell>
						<TableCell className='p-[10px] border-b-[1px] border-gray-300'>
							{user.phone}
						</TableCell>
						<TableCell className='p-[10px] border-b-[1px] border-gray-300'>
							<p
								className={
									user.status
										? 'text-[#fff] bg-[green] rounded-md text-center py-[5px] font-bold'
										: 'text-[#fff] bg-[red] rounded-md text-center py-[5px] font-bold'
								}
							>
								{user.status ? 'active' : 'inactive'}
							</p>
						</TableCell>
						<TableCell className='p-[10px] border-b-[1px] border-gray-300'>
							{user.city}
						</TableCell>
						<TableCell className='p-[10px] border-b-[1px] border-gray-300'>
							<div className='flex gap-[5px] items-center'>
							<button
								className='bg-[red] text-white px-[5px] mx-1 py-[5px] rounded-md cursor-pointer'
								onClick={() => handleDelete(user.id)}
							>
								Delete
							</button>
							<button
								className='bg-blue-600 px-[5px] text-white  py-[5px] rounded-md cursor-pointer'
								onClick={() => handleEdit(user)}
							>
								Edit
							</button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</Table>

			{(isModalOpen || isEditOpen) && (
				<div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
					<div className='w-[40%] bg-white shadow-2xl  p-5 rounded-lg flex flex-col'>
						<p className='text-[20px] text-black font-bold'>{isEditOpen ? "Edit User" : "Add New User"}</p>
						<input
							value={isEditOpen ? editName : addName}
							onChange={e =>
								isEditOpen
									? setEditName(e.target.value)
									: setAddName(e.target.value)
							}
							placeholder='Name'
							className='p-2 border-black border rounded-md text-black'
						/>
						<input
							value={isEditOpen ? editSurName : addSurName}
							onChange={e =>
								isEditOpen
									? setEditSurName(e.target.value)
									: setAddSurName(e.target.value)
							}
							placeholder='Surname'
							className='p-2 border-black border rounded-md text-black mt-2'
						/>
						<input
							value={isEditOpen ? editEmail : addEmail}
							onChange={e =>
								isEditOpen
									? setEditEmail(e.target.value)
									: setAddEmail(e.target.value)
							}
							placeholder='Email'
							className='p-2 border-black border rounded-md text-black mt-2'
						/>
						<input
							value={isEditOpen ? editCity : addCity}
							onChange={e =>
								isEditOpen
									? setEditCity(e.target.value)
									: setAddCity(e.target.value)
							}
							placeholder='City'
							className='p-2 border-black border rounded-md text-black mt-2'
						/>
						<input
							value={isEditOpen ? editPhone : addPhone}
							onChange={e =>
								isEditOpen
									? setEditPhone(e.target.value)
									: setAddPhone(e.target.value)
							}
							placeholder='Phone'
							className='p-2 border-black border text-black rounded-md mt-2'
						/>
						<select
							className='p-3 border-black text-black border rounded-md my-2'
							onChange={e =>
								isEditOpen
									? setEditStatus(e.target.value === 'true')
									: setAddStatus(e.target.value === 'true')
							}
						>
							<option value='true'>Active</option>
							<option value='false'>Inactive</option>
						</select>
						<div className='flex gap-[20px] items-center'>
						<Button
							sx='text-[#fff] font-bold cursor-pointer rounded-md px-[15px]'
							color='primary'
							size='small'
							onClick={isEditOpen ? handleUpdate : handleSave}
						>
							{isEditOpen ? 'Save' : 'Save'}
						</Button>
						<button
						 className='border-black text-black'
							onClick={() => {
								setIsModalOpen(false)
								setIsEditOpen(false)
							}
						}
						>
							Cancel
						</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
