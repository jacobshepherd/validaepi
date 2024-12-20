'use client'

import { useState, useEffect } from 'react'
import Layout from '../components/layout'

export default function AdminDashboard() {
  const [businesses, setBusinesses] = useState([])
  const [newLicense, setNewLicense] = useState({ businessId: '', expirationDate: '' })

  useEffect(() => {
    fetchBusinesses()
  }, [])

  const fetchBusinesses = async () => {
    // In a real application, you would fetch this data from your backend
    // For now, we'll use mock data
    const mockBusinesses = [
      { id: 1, name: 'Empresa A', licenseExpiration: '2023-12-31' },
      { id: 2, name: 'Empresa B', licenseExpiration: '2024-06-30' },
    ]
    setBusinesses(mockBusinesses)
  }

  const handleInputChange = (e) => {
    setNewLicense({ ...newLicense, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically update the license in your backend
    console.log(`License updated for business ${newLicense.businessId} to expire on ${newLicense.expirationDate}`)
    setNewLicense({ businessId: '', expirationDate: '' })
    // After updating, refetch the businesses
    fetchBusinesses()
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Painel de Administração</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Atribuir Licença</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="businessId" className="block text-sm font-medium text-gray-700">
                Empresa
              </label>
              <select
                id="businessId"
                name="businessId"
                value={newLicense.businessId}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Selecione uma empresa</option>
                {businesses.map((business) => (
                  <option key={business.id} value={business.id}>
                    {business.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                Data de Expiração
              </label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={newLicense.expirationDate}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Atribuir Licença
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Empresas Registradas</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome da Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiração da Licença
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {businesses.map((business) => (
                <tr key={business.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {business.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {business.licenseExpiration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

