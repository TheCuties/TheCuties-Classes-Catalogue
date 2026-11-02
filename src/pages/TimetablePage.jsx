const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function TimetablePage() {
  const hours = Array.from({ length: 14}, (_, i) => `${i + 8}:00 - ${i + 9}:00`);

  return (
    <div className="w-full mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-semibold mb-6">Timetable</h1>
      <table className="table-auto border-collapse">
        <thead>
          <tr>
            <th className={`w-40 h-10`}></th>
            {DAYS_OF_WEEK.map((day) => (
              <th key={day} className={`w-80 font-semibold text-center`}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className={`h-20 font-semibold text-right pr-3`}>{hour}</td>
              {Array.from({ length: 7 }).map((_, index) => (
                <td key={index} className={`border border-black`}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimetablePage;