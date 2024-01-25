import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);
  const [movieStats, setMovieStats] = useState([]);
  const [seriesStats, setSeriesStats] = useState([]);

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await axios.get("/users/stats");
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getUserStats();

    const getMoviesStats = async () => {
      try {
        const res = await axios.get("/movies/movieStats");
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setMovieStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Movie": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getMoviesStats();

    const getSeriesStats = async () => {
      try{
      const res = await axios.get("/movies/seriesStats");
      const statsList = res.data.sort(function (a,b) {
        return a._id - b._id;
      })
      statsList.map((item) => [
        setSeriesStats((prev) =>[
        ...prev,
        {name: MONTHS[item.id -1], "New Series": item.total},
      ])]);} catch(error){
        console.log(error);
      }
    };
    getSeriesStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={movieStats} title="Movies Analytics" grid dataKey="New Movie" />
     <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <Chart data={seriesStats} title="Series Analytics" grid dataKey="New Series" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  ); 
}
