import React, { useEffect } from 'react'
import DeliveryAddress from './partials/DeliveryAddress'  // ← use this instead
import { Footer, Header } from '../../../components'

function Addresses() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}, [])

  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        <DeliveryAddress/>
      </div>
    </div>
  )
}

export default Addresses