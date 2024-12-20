'use client'

import { useState, useEffect } from 'react'

export default function EquipmentAssignment() {
  const [assignments, setAssignments] = useState([])
  const [employees, setEmployees] = useState([])
  const [equipmentList, setEquipmentList] = useState([])
  const [newAssignment, setNewAssignment] = useState({
    employeeId: '',
    equipmentId: '',
    quantity: '',
  })

  useEffect(() => {
    fetchAssignments()
    fetchEmployees()
    fetchEquipment()
  }, [])

  const fetchAssignments = async () => {
    const response = await fetch('/api/assignments')
    const data = await response.json()
    setAssignments(data)
  }

  const fetchEmployees = async () => {
    const response = await fetch('/api/employees')
    const data = await response.json()
    setEmployees(data)
  }

  const fetchEquipment = async () => {
    const response = await fetch('/api/equipment')
    const data = await response.json()
    setEquipmentList(data)
  }

  const handleInputChange = (e) => {
    setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAssignment),
    })
    if (response.ok) {
      setNewAssignment({ employeeId: '', equipmentId: '', quantity: '' })
      fetchAssignments()
      // Here you would typically send a WhatsApp message to the employee
      console.log(`WhatsApp message sent to employee about equipment assignment`)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Atribuir Equipamentos</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <select
            name="employeeId"
            value={newAssignment.employeeId}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Selecione um funcionário</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} - {emp.role}
              </option>
            ))}
          </select>
          <select
            name="equipmentId"
            value={newAssignment.equipmentId}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Selecione um equipamento</option>
            {equipmentList.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.name} (Disponível: {eq.quantity})
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            placeholder="Quantidade"
            value={newAssignment.quantity}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
          Atribuir Equipamento
        </button>
      </form>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funcionário</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipamento</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{assignment.employeeName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{assignment.equipmentName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{assignment.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

