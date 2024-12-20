'use client'

import { useState, useEffect } from 'react'

export default function PartCertificationManagement() {
  const [certifications, setCertifications] = useState([])
  const [newCertification, setNewCertification] = useState({
    name: '',
    description: '',
    validUntil: '',
  })

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    const response = await fetch('/api/certifications')
    const data = await response.json()
    setCertifications(data)
  }

  const handleInputChange = (e) => {
    setNewCertification({ ...newCertification, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/certifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCertification),
    })
    if (response.ok) {
      setNewCertification({ name: '', description: '', validUntil: '' })
      fetchCertifications()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gerenciar Certificações de Peças</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nome da Certificação"
            value={newCertification.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={newCertification.description}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="validUntil"
            placeholder="Válido até"
            value={newCertification.validUntil}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
          Adicionar Certificação
        </button>
      </form>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Válido até</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {certifications.map((cert) => (
            <tr key={cert.id}>
              <td className="px-6 py-4 whitespace-nowrap">{cert.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cert.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cert.validUntil}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

