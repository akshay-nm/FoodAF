import React from 'react'
import AddDish from './AddDish'
import Todays from './Todays'
import Tomorrows from './Tomorrows'
import DayAfters from './DayAfters'
import Yesterdays from './Yesterdays'
import AllDishes from './AllDishes'

const Dashboard = () => (
  <div className="p-4 bg-gray-900">
    <Yesterdays />
    <Todays />
    <Tomorrows />
    <DayAfters />
    <AddDish />
    <AllDishes />
  </div>
)

export default Dashboard
