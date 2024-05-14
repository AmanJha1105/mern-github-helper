import React, { useCallback, useEffect, useState } from 'react'
import SortRepos from '../components/SortRepos';
import Search from '../components/Search';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();

  const {authUser}=useAuthContext();
  if(!authUser){
    navigate("/login");
  }



  const [userProfile,setuserProfile]=useState(null);
  const [repos,setRepos]=useState([]);
  const [loading,setLoading]=useState(false);

  const [sortType,setSortType]=useState("recent");

  const getUserProfileAndRepos=useCallback(async(username="AmanJha1105")=>{
    setLoading(true);
    console.log(authuser.username);
    try{

      const res = await fetch(`/api/users/profile/${authUser.username}`);
      const {repos,userProfile}=await res.json();

      repos.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));

      setRepos(repos);
      setuserProfile(userProfile);
      // console.log("userProfile",userProfile);
      // console.log("repos",repos);
      return {userProfile,repos};

      
 
    }catch(error){
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
     
  },[]
)
  useEffect(()=>{
    if(authUser)getUserProfileAndRepos();
  },[getUserProfileAndRepos])

  const onSearch = async(e,username)=>{
    e.preventDefault();

    setLoading(true);
    setRepos([]);
    setuserProfile(null);

    const {userProfile,repos}=await getUserProfileAndRepos(username);

    setuserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType("recent");
  };

  const onSort =(sortType)=>{
    if(sortType==="recent"){
      repos.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
    }
    else if(sortType==="stars"){
      repos.sort((a,b)=>b.stargazers_count-a.stargazers_count);
    }
    else if(sortType==="forks"){
      repos.sort((a,b)=>b.forks_count-a.forks_count);
    }

    setSortType(sortType);
    setRepos([...repos]);

  }

	return (
		<div className='m-4'>
			<Search onSearch={onSearch}/>
			{repos.length>0 && <SortRepos onSort={onSort} sortType={sortType}/>}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
      {userProfile && !loading && <ProfileInfo userProfile={userProfile}/>}
      {!loading && <Repos repos={repos}/>}
			{loading && <Spinner/>}
			</div>
		</div>
	);
};

export default HomePage