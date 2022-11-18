import React,{ useState, useEffect, useRef } from 'react'
import csvFile from "./hotel_bookings_1000.csv" 
import * as d3  from "d3"
import Card from './Card'
import './Dashboard.css'
import ApexLineChart from './ApexLineChart'
import DonutChart from './DonutChart'
import ApexAreChart from './ApexAreaChart'
function Dashboard() {
    
    const[data, setData] = useState([])
    const[startDate, setStartDate] = useState(null)
    const[endDate, setEndDate] = useState(null)
    // const[adults, setAdults] = useState();
    // const[children, setChildren] = useState();
    // const[babies, setBabies] = useState();
    const[state, setState] = useState([])
    const[people, setPeople] = useState([])
    const[adults, setAdults] = useState([])
    const[children, setChildren] = useState([])
    
    // count of the total people
    // const[total, setTotal] = useState();
    const inputStartDate = useRef();
    const inputEndDate = useRef()
    let dates = []
    let totalPersonEachDay = []
    let totalAdultsEachDay = []
    let totalChildrensEachDay = []
    let countries = []
    let totalPersonCountries =[]
    let dateProps = []
    let totalPeopleProps = []
 

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
    // const[totalPeople, setTotalPeople] = useState([])
    // const uniqueCountries = [...new Set(data.map((obj)=>{
    //     return obj.country
    // }))]

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
        // setState([...state,value])
    })

    adultMap.forEach(function(value, date){
        // console.log(value, date);
        totalAdultsEachDay.push(value)
    })

    childrenMap.forEach(function(value, date){
        totalChildrensEachDay.push(value);
    })

    countryMap.forEach(function(country, value){
        countries.push(country)
        totalPersonCountries.push(parseInt(value))
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
        let val1 = startDate;
        let val2 = endDate;

        

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

        console.log(val1);
        console.log(val2);

        //temp array of dates
        let indexOfStartDate = dates.indexOf(val1)
        let indexOfEndDate = dates.indexOf(val2)
        // console.log(indexOfStartDate);
        // console.log(indexOfEndDate);
        // console.log(tempdates)
        // console.log(val2)

        //slice the tempdates array
        const filteredDates = dates.slice(indexOfStartDate, indexOfEndDate + 1);
        const filteredTotalPerson = totalPersonEachDay.slice(indexOfStartDate, indexOfEndDate + 1);
        const filteredTotalAdultsEachDay = totalAdultsEachDay.slice(indexOfStartDate, indexOfEndDate + 1)
        const filteredTotalChildrensEachDay = totalChildrensEachDay.slice(indexOfStartDate, indexOfEndDate + 1)
//  
        // setDatesProps(filteredDates)
        // setTotalPeopleProps(filteredTotalPerson)s
        setState(filteredDates)
        setPeople(filteredTotalPerson)
        setAdults(filteredTotalAdultsEachDay)
        setChildren(filteredTotalChildrensEachDay)
        
        // console.log(totalPeopleProps);
        // console.log(dateProps)
        // console.log(filteredTotalAdultsEachDay);
        // console.log(filteredTotalChildrensEachDay);
        // console.log(filteredTotalPerson) 
        console.log(typeof(totalPersonCountries[0]));

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
        <input type="date"  ref={inputStartDate} onChange={(e)=> setStartDate(e.target.value)} />
        <label>Choose End Date</label>
        <input type="date"  ref={inputEndDate} onChange={(e) => setEndDate(e.target.value)}/>
        <button onClick={filterData}>Filter</button>
        </div>
        <div className="main_container">
            {/* <LineChart datesProps={dates} datapointProps={totalPersonEachDay}/> */}
        {/* <ApexAreChart dateProps={dateProps} dataPointProps={}/> */}
            <ApexLineChart dateProps={state} dataPointProps={people}/>
            <ApexLineChart dateProps={state} dataPointProps={adults}/>
            <ApexLineChart dateProps={state} dataPointProps={children}/>
            <DonutChart countryProps={countries} dataPointProps={totalPersonCountries}/>

        </div>
    </div>
  )
}

export default Dashboard