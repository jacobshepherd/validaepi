'use client'

import { useState, useEffect } from 'react'

export default function EquipmentManagement() {
  const [equipment, setEquipment] = useState([])
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    description: '',
    certification: '',
    approvedFor: '',
    validUntil: '',
    isValid: true,
    value: '',
    quantity: '',
  })

  useEffect(() => {
    fetchEquipment()
  }, [])

  const fetchEquipment = async () => {
    const response = await fetch('/api/equipment')
    const data = await response.json()
    setEquipment(data)
  }

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setNewEquipment({ ...newEquipment, [e.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/equipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEquipment),
    })
    if (response.ok) {
      setNewEquipment({
        name: '',
        description: '',
        certification: '',
        approvedFor: '',
        validUntil: '',
        isValid: true,
        value: '',
        quantity: '',
      })
      fetchEquipment()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gerenciar Equipamentos</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={newEquipment.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={newEquipment.description}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="certification"
            placeholder="Certificação"
            value={newEquipment.certification}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="approvedFor"
            placeholder="Aprovado Para"
            value={newEquipment.approvedFor}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="validUntil"
            placeholder="Válido até"
            value={newEquipment.validUntil}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isValid"
                checked={newEquipment.isValid}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2">É Válido</span>
            </label>
          </div>
          <input
            type="number"
            name="value"
            placeholder="Valor"
            value={newEquipment.value}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantidade"
            value={newEquipment.quantity}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
          Adicionar Equipamento
        </button>
      </form>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificação</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aprovado Para</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Válido até</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">É Válido</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {equipment.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.certification}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.approvedFor}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.validUntil}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.isValid ? 'Sim' : 'Não'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.value}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

