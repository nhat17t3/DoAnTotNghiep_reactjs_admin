import React, { useEffect, useState } from "react";
// import MultiSelect from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getListCategoryOrder, getListPayment, getListProductByPage, getProductById, getUserById } from "../../../actions";
import {
  getOrderById,updateOrder
} from "../../../actions/order.actions";
import Layout from "../../../components/Layout";
import Moment from "react-moment";


EditOrder.propTypes = {};

EditOrder.defaultProps = {};

function EditOrder(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderId } = useParams();

//   const [ isConfirm, setIsConfirm] = useState(false);
//   const [ isPay, setIsPay] = useState(false);
//   const [ isCancle, setIsCancle] = useState(false);
  const [ render, setRender] = useState(false);
  
  useEffect(() => {
      dispatch(getOrderById(+orderId));
    }, []);

    const findItem = useSelector((state) => state.order.order);

    


    
    //   useEffect(() => {
    //     dispatch(getListPayment());
    //   }, []);

    //   const listPayment = useSelector((state)=> state.payment.listPayment)
    // const payment = listPayment?.find((e)=>e.id===findItem.paymentId)
//   useEffect(() => {
//     dispatch(getProductById(findItem.orderDetails?.id?.productId));
//   }, [findItem]);

//   useEffect(() => {
//     if (findItem) {
//       setIsConfirm(findItem.isConfirm);
//       setIsPay(findItem.isPay);
//       setIsCancle(findItem.isCancle);
//     }
//   }, [findItem]);

  const handleConfirm = async (e) => {
    const form = {
      isConfirm : true,
      status :1,
      isPay : false,
      isCancle : false,
      isDone : false
    };
    await dispatch(updateOrder(+orderId,form));
    setRender(!render);
    // history.goBack();
  };

  const handleShip = async (e) => {
    const form = {
      isConfirm : true,
      status :2,
      isPay : false,
      isCancle : false,
      isDone : false
    };
    await dispatch(updateOrder(+orderId,form));
    setRender(!render);
    // history.goBack();
  };
  const handleSucess = async (e) => {
    const form = {
      isDone : true,
      status : 3,
      isPay : true,
      isCancle : false,
      isConfirm : false
    };
    await dispatch(updateOrder(+orderId,form));
    setRender(!render);
    // history.goBack();
  };

  const handleCancel = async (e) => {
    const form = {
      isCancle : true,
      status : 4,
      isPay : false,
      isConfirm : false,
      isDone : false
    };
    await dispatch(updateOrder(+orderId,form));
    setRender(!render);
  
    // history.goBack();
  };


  return (
    <>
      <Layout>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-10 grid-margin stretch-card offset-md-1">
              <div className="card">
                <div className="card-body">
                  <h3 className="text-center">Xem ????n h??ng</h3>
                  {/* <p className="card-description">Basic form layout</p> */}
                  <div className="card-body">
  <header className="row">
    <div className="col-10">
      <h6 className="mb-0">Order ID: {findItem.id} <i className="dot" />  
        <span className=""> {findItem.status == 0 ? <span class="badge bg-warning">Ch??? x??c nh???n</span> :
        findItem.status == 1 ? <span class="badge bg-primary">???? x??c nh???n</span> :
        findItem.status == 2 ? <span class="badge bg-info">??ang giao h??ng</span> :
        findItem.status == 3 ? <span class="badge bg-success">Th??nh c??ng</span> :
        <span class="badge bg-danger">???? h???y</span>}</span>
      </h6>
      <span className="text-muted">Ng??y ?????t h??ng: 
      <Moment format="YYYY/MM/DD HH:mm">
                                    {findItem.createdAt}
                                  </Moment></span>
    </div>
   
    <div className="dropdown me-auto" id="order-page">
    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Thao t??c
  </button>
  {findItem.status == 0 ?
  <div  className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{}}>
  <button className="dropdown-item" href="#" onClick={handleConfirm}>X??c nh???n ????n h??ng</button>
  <button className="dropdown-item" href="#"  onClick={handleCancel}>H???y ????n h??ng</button>
</div>
:
findItem.status == 1?
<div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{}}>
   <button className="dropdown-item" href="#" onClick={handleShip}> giao h??ng</button>
   <button className="dropdown-item" href="#"  onClick={handleCancel}>H???y ????n h??ng</button>
</div> :
findItem.status== 2 ?
<div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{}}>
   <button className="dropdown-item" href="#"  onClick={handleSucess}>X??c nh???n giao h??ng th??nh c??ng</button>
   {/* <button className="dropdown-item" href="#"  onClick={handleCancel}>H???y ????n h??ng</button> */}
</div>
:
null}

    </div>
  </header>
  <hr />
  <div className="row">

    <div className="col-lg-8 border-start">
      <p className="mb-0">Th??ng tin nh???n h??ng</p>
      <p className="m-0">H??? t??n: {findItem.nameReceiver} <br /> 
       S??? ??i???n tho???i: {findItem.phoneReceiver} <br />
       Email: {findItem.emailReceiver}  <br />
       ?????a ch???:  {findItem.phoneReceiver} </p>
    </div> {/* col.// */}
    <div className="col-lg-4 border-start">
      <p className="mb-0 text-muted">H??nh th???c thanh to??n</p>
      <p className="m-0">
        <span className="text-danger"> {findItem.payment?.name} </span> <br /> 
       
      </p>
    </div> {/* col.// */}
  </div> {/* row.// */}
  <hr />
  <div className="row">
<div className="col-8">
<div className="row">
  <div className="col-12 table-responsive">
    <table className="table ">
      <thead>
        <tr>
          <th>STT</th>
          <th>???nh</th>
          <th>T??n s???n ph???m</th>
          <th>s??? l?????ng</th>
          <th>t???ng ti???n</th>
        </tr>
      </thead>
      <tbody>
      {findItem.orderDetails?.map((element, index)=> 
        <tr>
          <td>{index +1}</td>
          <td><img src={"http://localhost:8080/files/" + element.product.image} className="img-sm img-thumbnail" /></td>
          <td>{element.product?.name}</td>
          <td>{element.quantity}</td>
          <td>{element.promotionPrice * element.quantity} VN??</td>
        </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
</div>
  
  <div className="col-4">
  <div className="card">
  <div className="card-body">
    <dl className="dlist-align">
      <dt>Gi?? s???n ph???m:</dt>
      <dd className="text-end">{findItem.total-findItem.shippingFee + findItem.discount} VN??</dd>
    </dl>
    <dl className="dlist-align">
      <dt>ph?? v???n chuy???n</dt>
      <dd className="text-end text-danger"> + {findItem.shippingFee} VN??</dd>
    </dl>
    <dl className="dlist-align">
      <dt>Gi???m gi??</dt>
      <dd className="text-end text-success">- {findItem.discount} VN??</dd>
    </dl>
    <hr />
    <dl className="dlist-align">
      <dt>T???ng c???ng:</dt>
      <dd className="text-end text-dark h5"> {findItem.total} VN?? </dd>
    </dl>

  </div> {/* card-body.// */}
</div>

  </div>
  </div>
</div>

                

                 
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default EditOrder;
