import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListBrand, getListCategory } from "../../../actions";
import { createProduct } from "../../../actions/product.actions";
import Layout from "../../../components/Layout";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

AddProduct.propTypes = {};

function AddProduct(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  // const [slug, setSlug] = useState("");
  const [code, setCode] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedMoreFile, setSelectedMoreFile] = useState([]);

  const [unitPrice, setUnitPrice] = useState(0);
  const [promotionPrice, setPromotionPrice] = useState(0);
  const [instock, setInstock] = useState(0);
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [specification, setSpecification] = useState("");
  const [isHot, setIsHot] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [brandId, setBrandId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    dispatch(getListBrand());
  }, []);

  const listBrand = useSelector((state) => state.brand.listBrand);

  useEffect(() => {
    dispatch(getListCategory());
  }, []);

  const listCategory = useSelector((state) => state.category.listCategory);

  const changeHandlerFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // const optionCate = [];
  // listCategory.forEach((element) => {
  //   optionCate.push({ label: element.name, value: element.id });
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("code", code);
    formData.append("unitPrice", unitPrice);
    formData.append("promotionPrice", promotionPrice);
    formData.append("instock", instock);
    formData.append("shortDesc", shortDesc);
    formData.append("description", description);
    formData.append("ingredient", ingredient);
    formData.append("specification", specification);
    formData.append("isHot", isHot);
    formData.append("isNew", isNew);
    formData.append("isActive", isActive);
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);
    formData.append("image", selectedFile);

    for (let i = 0; i < selectedMoreFile.length; i++) {
      formData.append(`moreImage`, selectedMoreFile[i]);
    }

    // let listcate = [];
    // for (const a of categories) {
    //   listcate.push(a.value);
    // }
    // formData.append("categories", listcate);

    console.log("file", selectedFile);
    console.log("file", selectedMoreFile.length);
    await dispatch(createProduct(formData));

    // history.push("/products/list");
    history.goBack();
  };

  return (
    <>
      <Layout>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card offset-md-0">
              <div className="card">
                <div className="card-body">
                  <h3 className=" text-center">Th??m s???n ph???m</h3>
                  {/* <p className="card-description">Basic form layout</p> */}
                  <form className="forms-sample row" onSubmit={handleSubmit}>
                    {/* <div className="row">
                      <div className="col-6"></div>
                      <div className="col-6"></div>
                    
                    </div> */}

                    <div className="form-group col-12">
                      <label htmlFor="name">T??n s???n ph???m</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group col-6">
                      <label htmlFor="name">M?? s???n ph???m</label>
                      <input
                        type="text"
                        name="code"
                        className="form-control"
                        id="code"
                        placeholder=""
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group col-6">
                      <label htmlFor="brand">Th????ng hi???u</label>
                      <select
                        className="form-control"
                        id="brand"
                        name="brandId"
                        onChange={(e) => setBrandId(e.target.value)}
                        value={brandId}
                        required
                      >
                        <option value={""} hidden> --ch???n th????ng hi???u--</option>
                        {listBrand?.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group col-6">
                      <label htmlFor="brand">Danh m???c</label>
                      <select
                        className="form-control"
                        name="categoryId"
                        onChange={(e) => setCategoryId(e.target.value)}
                        value={categoryId}
                        required
                      >
                        <option value={""} hidden>--ch???n danh m???c--</option>
                        {listCategory?.map((item) => {
                          // if (item.parentId != 0)
                          //   return <option value={item.id}>{item.name}</option>;
                          // else return null;

                          return <option value={item.id}>{item.name}</option>;
                        })}
                      </select>
                    </div>

                    {/* <div className="form-group col-6">
                      <label htmlFor="brand">Danh m???c</label>
                      <MultiSelect
                        options={optionCate}
                        value={categories}
                        onChange={setCategories}
                        className=""
                        required
                      />
                    </div> */}
                    <div className="form-group col-6">
                      <label htmlFor="name">S??? l?????ng</label>
                      <input
                        type="number"
                        name="instock"
                        className="form-control"
                        id="instock"
                        placeholder=""
                        value={instock}
                        onChange={(e) => setInstock(e.target.value)}
                        required
                      />
                    </div>
                    {/* img */}
                    <div className="form-group col-6">
                      <label htmlFor="name">Gi?? g???c</label>
                      <input
                        type="number"
                        name="unitPrice"
                        className="form-control"
                        id="unitPrice"
                        placeholder=""
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group col-6">
                      <label htmlFor="name">Gi?? khuy???n m??i</label>
                      <input
                        type="number"
                        name="promotionPrice"
                        className="form-control"
                        id="promotionPrice"
                        placeholder=""
                        value={promotionPrice}
                        onChange={(e) => setPromotionPrice(e.target.value)}
                        required
                      />
                    </div>

                    <div class="form-group col-12">
                      <label for="shortDesc">M?? t??? ng???n</label>
                      <textarea
                        class="form-control"
                        id="shortDesc"
                        rows="4"
                        name="shortDesc"
                        // value={description}
                        onChange={(e) => setShortDesc(e.target.value)}
                        required
                      >
                        {shortDesc}
                      </textarea>
                    </div>

                    {/* description */}
                    {/* <div class="form-group">
                      <label for="description">M?? t???</label>
                      <textarea
                        class="form-control"
                        id="description"
                        rows="4"
                        name="description"
                        // value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      >
                        {description}
                      </textarea>
                    </div> */}
                    <div for="specification">M?? t???</div>

                    <SunEditor
                      onChange={(content) => setDescription(content)}
                      setContents={description}
                      name="description"
                      setOptions={{
                        height: 500,
                        buttonList: buttonList.complex,
                      }}
                    />

                   
                    {/* <div for="specification">Th??nh ph???n</div>
                    <SunEditor
                      onChange={(content) => setIngredient(content)}
                      setContents={ingredient}
                      name="ingredient"
                      setOptions={{
                        height: 200,
                        buttonList: buttonList.complex,
                      }}
                    /> */}

                

                    <div for="specification">Th??ng s??? ?????c t???</div>
                    <SunEditor
                      onChange={(content) => setSpecification(content)}
                      setContents={specification}
                      name="specification"
                      setOptions={{
                        height: 400,
                        buttonList: buttonList.complex,
                      }}
                    />

                    <div className="form-group col-12">
                      <label style={{ display: "block" }}>H??nh ???nh</label>
                      <input
                        type="file"
                        name="imyy"
                        className=""
                        onChange={changeHandlerFile}
                        required
                      />
                    </div>

                    <div className="form-group col-12">
                      {/* <img src={moreImage}></img> */}
                      <label style={{ display: "block" }}>
                        H??nh ???nh chi ti???t
                      </label>
                      <input
                        multiple
                        type="file"
                        name="moreImage"
                        className=""
                        onChange={(event) =>
                          setSelectedMoreFile(event.target.files)
                        }
                        required
                      />
                    </div>

                    <div class="form-group col-4">
                      <p class="">S???n ph???m Hot</p>
                      <label className="switch switch-default switch-pill switch-danger mr-2">
                        <input
                          type="checkbox"
                          className="switch-input"
                          name="isHot"
                          value={isHot}
                          onChange={() => setIsHot(!isHot)}
                          checked={isHot}
                        />
                        <span className="switch-label" />
                        <span className="switch-handle" />
                      </label>
                    </div>

                    {/* <div class="form-group col-4">
                      <p class="">S???n ph???m m???i</p>
                      <label class="toggle-switch toggle-switch-success">
                        <input
                          type="checkbox"
                          name="isNew"
                          value={isNew}
                          onChange={() => setIsNew(!isNew)}
                          checked={isNew}
                        />
                        <span class="toggle-slider round"></span>
                      </label>
                    </div> */}
                    <div class="form-group col-4">
                      <p class=""> Hi???n th???</p>
                      <label className="switch switch-default switch-pill switch-success mr-2">
                        <input
                          type="checkbox"
                          className="switch-input"
                          name="isActive"
                          value={isActive}
                          onChange={() => setIsActive(!isActive)}
                          checked={isActive}
                        />
                        <span className="switch-label" />
                        <span className="switch-handle" />
                      </label>
                    </div>
<div className="col-4">

</div>
                    <button type="submit" className="btn btn-primary mr-2">
                      Th??m
                    </button>
                    {/* <button className="btn btn-light">H???y</button> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AddProduct;
