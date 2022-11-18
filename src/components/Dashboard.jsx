import React, { useState, useEffect, useRef } from "react";
import csvFile from "./hotel_bookings_1000.csv";
import * as d3 from "d3";
import "./Dashboard.css";
import ApexLineChart from "./ApexLineChart";
import DonutChart from "./DonutChart"; 
function Dashboard() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [state, setState] = useState([]);
  const [people, setPeople] = useState([]);
  const [adults, setAdults] = useState([]);
  const [children, setChildren] = useState([]);

  const inputStartDate = useRef();
  const inputEndDate = useRef();
  let dates = [];
  let totalPersonEachDay = [];
  let totalAdultsEachDay = [];
  let totalChildrensEachDay = [];
  let countries = [];
  let totalPersonCountries = [];

  const dummy = [
    {
      name: "January",
      val: "01",
    },
    {
      name: "February",
      val: "02",
    },
    {
      name: "March",
      val: "03",
    },
    {
      name: "April",
      val: "04",
    },
    {
      name: "May",
      val: "05",
    },
    {
      name: "June",
      val: "06",
    },
    {
      name: "July",
      val: "07",
    },
    {
      name: "August",
      val: "08",
    },
    {
      name: "September",
      val: "09",
    },
    {
      name: "October",
      val: "010",
    },
    {
      name: "November",
      val: "11",
    },
    {
      name: "December",
      val: "12",
    },
  ];

  const map = new Map();
  const adultMap = new Map();
  const childrenMap = new Map();
  const countryMap = new Map();
  data.map((val) => {
    const temp = `${val.arrival_date_year}-${val.arrival_date_month}-${val.arrival_date_day_of_month}`;
    const country = val.country;
    if (map.get(temp)) {
      map.set(
        temp,
        map.get(temp) +
          parseInt(val.adults) +
          parseInt(val.children) +
          parseInt(val.babies)
      );
    } else {
      map.set(
        temp,
        parseInt(val.children) + parseInt(val.adults) + parseInt(val.babies)
      );
    }

    //filling the map to find total number of adults per day
    if (adultMap.get(temp)) {
      adultMap.set(temp, adultMap.get(temp) + parseInt(val.adults));
    } else {
      adultMap.set(temp, parseInt(val.adults));
    }

    //filling the map to find the total number of childrens per day
    if (childrenMap.get(temp)) {
      childrenMap.set(temp, childrenMap.get(temp) + parseInt(val.children));
    } else {
      childrenMap.set(temp, parseInt(val.children));
    }

    //filling the map to find the total number of visitors per country
    if (countryMap.get(country)) {
      countryMap.set(
        country,
        countryMap.get(country) +
          parseInt(val.children) +
          parseInt(val.babies) +
          parseInt(val.adults)
      );
    } else {
      countryMap.set(
        country,
        parseInt(val.children) + parseInt(val.babies) + parseInt(val.adults)
      );
    }
  });

  //here is the function to fill the dates array of 40 dates
  map.forEach(function (date, value) {
    dates.push(value);
    totalPersonEachDay.push(date);
  });

  adultMap.forEach(function (value, date) {
    // console.log(value, date);
    totalAdultsEachDay.push(value);
  });

  childrenMap.forEach(function (value, date) {
    totalChildrensEachDay.push(value);
  });

  countryMap.forEach(function (value, country) {
    console.log("++++++++", country, value, typeof value);
    countries.push(country);
    totalPersonCountries.push(parseInt(value));
  });

  //handling the csv and extracting the files
  useEffect(() => {
    d3.csv(csvFile, (val) => {
      setData((oldval) => [...oldval, val]);
    });
  }, []);

  function filterData() {
    let val1 = startDate;
    let val2 = endDate;

    let startArray = val1.split("-");
    let endArray = val2.split("-");
    dummy.map((e) => {
      if (e.val == startArray[1]) {
        startArray[1] = e.name;
        startArray[2] = parseInt(startArray[2]).toString();
      }
      if (e.val == endArray[1]) {
        endArray[1] = e.name;
        endArray[2] = parseInt(endArray[2]).toString();
      }
    });
    //final dates value we can use to slice the dates array
    val1 = startArray.join("-");
    val2 = endArray.join("-");

    console.log(val1);
    console.log(val2);

    //temp array of dates
    let indexOfStartDate = dates.indexOf(val1);
    let indexOfEndDate = dates.indexOf(val2);
    // console.log(indexOfStartDate);
    // console.log(indexOfEndDate);
    // console.log(tempdates)
    // console.log(val2)

    //slice the tempdates array
    const filteredDates = dates.slice(indexOfStartDate, indexOfEndDate + 1);
    const filteredTotalPerson = totalPersonEachDay.slice(
      indexOfStartDate,
      indexOfEndDate + 1
    );
    const filteredTotalAdultsEachDay = totalAdultsEachDay.slice(
      indexOfStartDate,
      indexOfEndDate + 1
    );
    const filteredTotalChildrensEachDay = totalChildrensEachDay.slice(
      indexOfStartDate,
      indexOfEndDate + 1
    );
    //
    // setDatesProps(filteredDates)
    // setTotalPeopleProps(filteredTotalPerson)s
    setState(filteredDates);
    setPeople(filteredTotalPerson);
    setAdults(filteredTotalAdultsEachDay);
    setChildren(filteredTotalChildrensEachDay);

    // console.log(totalPeopleProps);
    // console.log(dateProps)
    // console.log(filteredTotalAdultsEachDay);
    // console.log(filteredTotalChildrensEachDay);
    // console.log(filteredTotalPerson)
    console.log(typeof totalPersonCountries[0]);
  }

  return (
    <div className="dashboard_container">
      <div className="input_container">
        <label className="input_label">Choose Start Date :</label>
        <input
          type="date"
          ref={inputStartDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input"
        />
        <label className="input_label">Choose End Date :</label>
        <input
          type="date"
          ref={inputEndDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input"
        />
        <button onClick={filterData} className="filter_button">Filter</button>
      </div>
      <div className="main_container">
        <div className="card_container">
          <ApexLineChart
            dateProps={state.length === 0 ? dates : state}
            dataPointProps={state.length === 0 ? totalPersonEachDay : people}
            name="Total People Per Day"
          />
        </div>
        <div className="card_container">
          <ApexLineChart
            dateProps={state.length === 0 ? dates : state}
            dataPointProps={state.length === 0 ? totalAdultsEachDay : adults}
            name="Total Adults Per Day"
          />
        </div>
        <div className="card_container">
          <ApexLineChart
            dateProps={state.length === 0 ? dates : state}
            dataPointProps={
              state.length === 0 ? totalChildrensEachDay : children
            }
            name="Total Childrens Per Day"
          />
        </div>
        <div className="card_container">
          <DonutChart
            countryProps={countries}
            dataPointProps={totalPersonCountries}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
