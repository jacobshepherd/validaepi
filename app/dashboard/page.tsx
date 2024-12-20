'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import EmployeeManagement from '../components/employee-management'
import PartCertificationManagement from '../components/part-certification-management'
import EquipmentManagement from '../components/equipment-management'
import EquipmentAssignment from '../components/equipment-assignment'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('employees')

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard da Empresa</h1>
        
        <div className="mb-4">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('employees')}
              className={`px-3 py-2 font-medium text-sm rounded-md ${
                activeTab === 'employees'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Funcionários
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-3 py-2 font-medium text-sm rounded-md ${
                activeTab === 'certifications'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Certificações
            </button>
            <button
              onClick={() => setActiveTab('equipment')}
              className={`px-3 py-2 font-medium text-sm rounded-md ${
                activeTab === 'equipment'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Equipamentos
            </button>
            <button
              onClick={() => setActiveTab('assignment')}
              className={`px-3 py-2 font-medium text-sm rounded-md ${
                activeTab === 'assignment'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Atribuição de Equipamentos
            </button>
          </nav>
        </div>

        {activeTab === 'employees' && <EmployeeManagement />}
        {activeTab === 'certifications' && <PartCertificationManagement />}
        {activeTab === 'equipment' && <EquipmentManagement />}
        {activeTab === 'assignment' && <EquipmentAssignment />}
      </div>
    </Layout>
  )
}

