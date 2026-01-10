
export default function DashboardCards() {
  const data = [
    {title:'Total Employees', value:120},
    {title:'Active Employees', value:98},
    {title:'Departments', value:6},
    {title:'Managers', value:12}
  ];
  return (
    <div className="cards">
      {data.map((d,i)=>(
        <div className="card" key={i}>
          <h4>{d.title}</h4>
          <p>{d.value}</p>
        </div>
      ))}
    </div>
  );
}
