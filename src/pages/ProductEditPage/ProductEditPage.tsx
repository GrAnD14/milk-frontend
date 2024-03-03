import "./ProductEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useProduct} from "../../hooks/products/useProduct";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const ProductEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        product,
        fetchProduct,
        setName,
        setDescription,
        setPrice,
        setImage
    } = useProduct()

    useEffect(() => {
        id && fetchProduct(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveProduct = async() => {
        let form_data = new FormData()

        form_data.append('name', product.name)
        form_data.append('description', product.description)
        form_data.append('price', product.price)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`products/${product.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/")
        }
    }

    const deleteProduct = async () => {

        const response = await api.delete(`products/${product.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (product == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={product.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={product.name} setValue={setName} />

                    <CustomTextarea placeholder="Описание" value={product.description} setValue={setDescription} />
                    
                    <CustomInput placeholder="Цена" value={product.price} setValue={setPrice} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveProduct}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteProduct}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProductEditPage