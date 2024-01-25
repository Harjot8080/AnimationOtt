import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from 'axios';

export default function FeaturedInfo() {
  const [seriesCount, setSeriesCount]= useState(0);
  const [seriesDiff, setSeriesDiff]= useState(0);
  const [userCount, setUserCount]= useState(0);
  const [userDiff, setUserDiff]= useState(0);
  const [movieCount, setMovieCount]= useState(0);
  const [movieDiff, setMovieDiff]= useState(0);

  useEffect(()=>{
    const getInfo = async () => { 
      let res= await axios.get("/movies/seriesCount");
      setSeriesCount(res.data[0]);
      setSeriesDiff(res.data[1]);
      res= await axios.get("/movies/movieCount");
      setMovieCount(res.data[0]);
      setMovieDiff(res.data[1]);
      res= await axios.get("/users/count");
      setUserCount(res.data[0]);
      setUserDiff(res.data[1]);
    },
    a= getInfo();
  },[]);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">No. User</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{userCount}</span>
          <span className="featuredMoneyRate">
            {userDiff} {userDiff>0? <ArrowUpward className="featuredIcon positive"/> : <ArrowDownward className="featuredIcon negative"/>}
            </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">No. of Series</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{seriesCount}</span>
          <span className="featuredMoneyRate">
            {seriesDiff} {seriesDiff>0? <ArrowUpward className="featuredIcon positive"/> : <ArrowDownward className="featuredIcon negative"/>}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">No. of Movies</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{movieCount}</span>
          <span className="featuredMoneyRate">
            {movieDiff} {movieDiff>0? <ArrowUpward className="featuredIcon positive"/> : <ArrowDownward className="featuredIcon negative"/>}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
