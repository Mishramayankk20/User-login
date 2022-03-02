import React ,{useState}from 'react'
import axios from "axios";
import { Redirect } from 'react-router-dom';
const WithAuth = (componentToProtect)=> {

const [loading,setLoading] = useState(true);
const [redirect,setRedirect] = useState(false);


 axios.post("http://localhost:5000/checkToken")
  .then((res) => {
    if (res.status === 200) {
      setLoading( false );
    } else {
      const error = new Error(res.error);
      throw error;
    }
  })
  .catch(err => {
    console.error(err);
    setLoading(false)
    setRedirect(true );
  });

    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to="/home" />;
    }
    return <componentToProtect {...this.props} />;

  }
export default WithAuth;