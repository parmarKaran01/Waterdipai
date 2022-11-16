import React,{ useState, useEffect, useRef } from 'react'
import csvFile from "./hotel_bookings_1000.csv" 
import * as d3  from "d3"
import Card from './Card'
import './Dashboard.css'
import LineChart from './LineChart'
import ApexLineChart from './ApexLineChart'
function Dashboard() {
    
    const[data, setData] = useState([])
    const[adults, setAdults] = useState();
    const[children, setChildren] = useState();
    const[babies, setBabies] = useState();
    
    // count of the total people
    const[total, setTotal] = useState();
    const inputStartDate = useRef();
    const inputEndDate = useRef()
    let dates = []
    let totalPersonEachDay = []
    let totalAdultsEachDay = []
    let totalChildrensEachDay = []
    const[dateProps, setDatesProps] = useState([])
    const[totalPeopleProps, setTotalPeopleProps] = useState([])

    const dummy = [
        {
            name: "January",
            val:"01"
        },
        {
            name: "February",
            val:"02"
        },
        {
            name: "March",
            val:"03"
        },
        {
            name: "April",
            val:"04"
        },
        {
            name: "May",
            val:"05"
        },
        {
            name: "June",
            val:"06"
        },
        {
            name: "July",
            val:"07"
        },
        {
            name: "August",
            val:"08"
        },
        {
            name: "September",
            val:"09"
        },
        {
            name: "October",
            val:"010"
        },
        {
            name: "November",
            val:"11"
        },
        {
            name: "December",
            val:"12"
        },
        
    ]

    const map  = new Map()
    const adultMap = new Map()
    const childrenMap = new Map()
    const countryMap = new Map()
    data.map((val) => {
        const temp = `${val.arrival_date_year}-${val.arrival_date_month}-${val.arrival_date_day_of_month}`
        const country = val.country
        if(map.get(temp)){
            map.set(temp,map.get(temp) + parseInt(val.adults) + parseInt(val.children)+parseInt(val.babies))
        }else {
            map.set(temp, parseInt(val.children) +  parseInt(val.adults) + parseInt(val.babies))
        }
        // console.log(temp, map.get(temp))

        //filling the map to find total number of adults per day
        if(adultMap.get(temp)){
            adultMap.set(temp, adultMap.get(temp) + parseInt(val.adults))
        }else{
            adultMap.set(temp, parseInt(val.adults))
        }

        //filling the map to find the total number of childrens per day
        if(childrenMap.get(temp)){
            childrenMap.set(temp, childrenMap.get(temp)+ parseInt(val.children))
        }else {
            childrenMap.set(temp, parseInt(val.children))
        }


        //filling the map to find the total number of visitors per country
        if(countryMap.get(country)){
            countryMap.set(country, countryMap.get(country)+ parseInt(val.children)+ parseInt(val.babies)+ parseInt(val.adults))
        }else{
            countryMap.set(country, parseInt(val.children)+ parseInt(val.babies)+ parseInt(val.adults))
        }

    })

    
    

    // array of the total people visited day wise
    const[totalPeople, setTotalPeople] = useState([])
    // const uniqueCountries = [...new Set(data.map((obj)=>{
    //     return obj.country
    // }))]

    // dates.map((val) =>{
    //     const temp = `${val.arrival_date_year}-${val.arrival_date_month}-${val.arrival_date_day_of_month}`

    // })

    // function getCount(){
    //     let childrenCount =0;
    //     let adultCount =0;
    //     let babiesCount =0;
    //     data.map((person) => {
    //         childrenCount = childrenCount + parseInt(person.children);
    //         adultCount = adultCount + parseInt(person.adults)
    //         babiesCount = babiesCount + parseInt(person.babies)

    //         setTotalPeople( oldTotalPeople => [...oldTotalPeople, parseInt(person.children) + parseInt(person.adults) + parseInt(person.babies)])

            
    //     })
    //     setChildren(childrenCount)
    //     setAdults(adultCount)
    //     setBabies(babiesCount)
    //     setTotal(childrenCount + adultCount + babiesCount)
        
    // }
    //here is the function to fill the dates array of 40 dates
    map.forEach(function(date, value){
        dates.push(value)
        totalPersonEachDay.push(date)
    })

    adultMap.forEach(function(value, date){
        // console.log(value, date);
        totalAdultsEachDay.push(value)
    })

    childrenMap.forEach(function(value, date){
        totalChildrensEachDay.push(value);
    })

    useEffect(()=>{
        d3.csv(csvFile, val => {
            setData(oldval=> [...oldval, val])
        })

        // console.log(getCount());
            // let childrenCount =0;
            // let adultCount =0;
            // let babiesCount =0;
            // data.map((person) => {
            //     childrenCount = childrenCount + parseInt(person.children);
            //     adultCount = adultCount + parseInt(person.adults)
            //     babiesCount = babiesCount + parseInt(person.babies)
    
            //     setTotalPeople( oldTotalPeople => [...oldTotalPeople, parseInt(person.children) + parseInt(person.adults) + parseInt(person.babies)])
    
                
            // })  
            // setChildren(childrenCount)
            // setAdults(adultCount)
            // setBabies(babiesCount)
            // setTotal(childrenCount + adultCount + babiesCount)
            // console.log(children); 
       
    },[])



    function filterData(){
        let val1 = inputStartDate.current.value;
        let val2 = inputEndDate.current.value;

        let startArray = val1.split("-");
        let endArray = val2.split("-")
        dummy.map((e)=>{
            if(e.val == startArray[1]){
                startArray[1] = e.name
                startArray[2] = parseInt(startArray[2]).toString()
            }
            if(e.val == endArray[1]){
                endArray[1] = e.name
                endArray[2] = parseInt(endArray[2]).toString()
            }
            
        })
        //final dates value we can use to slice the dates array
        val1 = startArray.join("-")
        val2 = endArray.join("-")

        //temp array of dates
        let tempdates = [...dates];
        let tempTotalPersonEachDay = [...totalPersonEachDay]
        let tempTotalAdultEachDay = [...totalAdultsEachDay]
        let tempTotalChildrensEachDay = [...totalChildrensEachDay]
        let indexOfStartDate = tempdates.indexOf(val1)
        let indexOfEndDate = tempdates.indexOf(val2)
        // console.log(indexOfStartDate);
        // console.log(indexOfEndDate);
        // console.log(tempdates)
        // console.log(val2)

        //slice the tempdates array
        const filteredDates = tempdates.slice(indexOfStartDate, indexOfEndDate + 1);
        const filteredTotalPerson = tempTotalPersonEachDay.slice(indexOfStartDate, indexOfEndDate + 1);
        const filteredTotalAdultsEachDay = tempTotalAdultEachDay.slice(indexOfStartDate, indexOfEndDate + 1)
        const filteredTotalChildrensEachDay = tempTotalChildrensEachDay.slice(indexOfStartDate, indexOfEndDate + 1)
 
        setDatesProps(filteredDates)
        setTotalPeopleProps(filteredTotalPerson)
        console.log(filteredDates);
        console.log(dateProps)
        // console.log(filteredTotalAdultsEachDay);
        // console.log(filteredTotalChildrensEachDay);
        // console.log(countryMap.get)
        // countryMap.forEach(function(value, country){
        //     console.log(value, country)
        // })
        // console.log(filteredTotalPerson)

    }

    
    
  return (
    <div className='dashboard_container'>
        <div>
         {/* <h4>{children} no of childrens</h4>
        <h4>{adults} no of adults</h4>
        <h4>{babies} no of babies</h4>
        <h4>{total} no of visitors</h4>  */}
        {/* <h4>{uniqueCountries.length} no of countries</h4> */}
        <label>Choose Start Date</label>
        <input type="date"  ref={inputStartDate} onChange={filterData} />
        <label>Choose End Date</label>
        <input type="date"  ref={inputEndDate} onChange={filterData}/>
        <button >getCount</button>
        </div>
        <div className="main_container">
            {/* <LineChart datesProps={dates} datapointProps={totalPersonEachDay}/> */}
            <ApexLineChart dateProps={dates} dataPointProps={totalPersonEachDay}/>
            <ApexLineChart dateProps={dates} dataPointProps={totalAdultsEachDay}/>
            <ApexLineChart dateProps={dates} dataPointProps={totalChildrensEachDay}/>
            
            <Card />

        </div>
    </div>
  )
}

export default Dashboard