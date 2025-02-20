import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  // console.log(data);

  const [pageData, setPageData] = useState([]);
  
  const [page, setPage] = useState(1);
  
  const [pageCount, setPageCount] = useState(0);
  // console.log(pageCount);

  const getData = async() =>{
    const response = await axios.get("https://dummyjson.com/products")
    console.log(response.data.products);
    setData(response.data.products);
  }

  const handleNext = () => {
    if(page === pageCount) return page;
    setPage(page + 1);
  }

  const handlePrevious = () => {
    if(page === 1) return page;
    setPage(page - 1);
  }

  useEffect(()=>{
    getData(); 
  },[page])

  useEffect(()=>{
    const pagedatacount = Math.ceil(data.length/4);
    setPageCount(pagedatacount);

    if (page) {
      const LIMIT = 4;
      const skip = LIMIT * page;
      const dataskip = data.slice(page === 1 ? 0 : skip-LIMIT,skip);
      setPageData(dataskip)
    }
  },[data])

  return (
    <>
      <div className="container">
        <h1 className="text-center">Products Data</h1>

        <div className="table_div mt-3">
          <Table striped bordered hover className="text-center">
            <thead >
              <tr>
                <th>Id</th>
                <th>Price</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {
                pageData.length > 0 ? 
                  pageData.map((element, index)=>{
                      return(
                        <tr>
                        <td>{element.id}</td>
                        <td>{element.price} $</td>
                        <td>{element.title}</td>
                        <td><img src={element.thumbnail} style={{width:80,height:80}} alt="" /></td>
                      </tr>
                      )
                  }) : 
                  <div className="d-flex justify-content-center align-content-center text-center mt-5 fw-bold">
                      Loading....  <Spinner animation="border" variant="danger" className="ms-2"/>
                  </div>
              }
              
            </tbody>
          </Table>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev onClick={handlePrevious}  disabled={page === 1}/>
          
          {
            Array(pageCount).fill(null).map((ele, index) =>{
                return(
                  <>
                    <Pagination.Item active={page === index + 1 ? true : false} onClick={()=>setPage(index + 1)}>{index + 1} </Pagination.Item>
                  </>
                )
            })
          }          
          <Pagination.Next onClick={handleNext} disabled={page === pageCount} />
        </Pagination>
      </div>
    </>
  );
};

export default Home;
