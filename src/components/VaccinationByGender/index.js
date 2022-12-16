import './index.css'

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {genderBy} = props
  //     console.log(genderBy)
  return (
    <div className="bg-age">
      <h1 className="head">Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="40%"
            data={genderBy}
            startAngle={180}
            endAngle={0}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#2cc6c6" />
            <Cell name="Female" fill=" #5a8dee" />
            <Cell name="Other" fill="#f54394" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
