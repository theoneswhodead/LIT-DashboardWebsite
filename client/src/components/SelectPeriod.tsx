const SelectPeriod = ({period, setPeriod}: any) => {
  return (
<select 
    className="bg-dark_opacity p-6 text-[16px] sm:text-[24px] uppercase font-black w-[300px] mb-[24px]"
    value={period}
    onChange={(e) => {
      const newPeriod = Number(e.target.value);
      setPeriod(newPeriod)
    }}
  >
    <option value="1000" className="bg-black">Od początku</option>
    <option value="365" className="bg-black">Ostatni rok</option>
    <option value="30" className="bg-black">Ostatni miesiąc</option>
    <option value="14" className="bg-black">Ostatnie dwa tygodnie</option>
    <option value="7" className="bg-black">Ostatni tydzień</option>
    <option value="1" className="bg-black">Ostatni dzień</option>
  </select>
  )
}

export default SelectPeriod
