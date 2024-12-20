'use client'

import { useState, useEffect } from 'react'

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    cpf: '',
    hireDate: '',
    whatsapp: '',
  })

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    const response = await fetch('/api/employees')
    const data = await response.json()
    setEmployees(data)
  }

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
    if (response.ok) {
      setNewEmployee({ name: '', role: '', cpf: '', hireDate: '', whatsapp: '' })
      fetchEmployees()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gerenciar Funcionários</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={newEmployee.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Cargo"
            value={newEmployee.role}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={newEmployee.cpf}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="hireDate"
            placeholder="Data de Contratação"
            value={newEmployee.hireDate}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            value={newEmployee.whatsapp}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
          Adicionar Funcionário
        </button>
      </form>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Contratação</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.cpf}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.hireDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.whatsapp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

