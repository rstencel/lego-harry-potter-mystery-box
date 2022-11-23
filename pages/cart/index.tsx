import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { Minifig, MinifigPart } from "../../interfaces"
import styles from "../../styles/Cart.module.css"
import { useForm } from "react-hook-form"
import ValidationError from "../../components/ValidationError"
import { validate } from 'email-validator'
import LoaderWithMessage from "../../components/LoaderWithMessage"
import { showToast } from "../../utilities/toast"

const PHONE_NUMBER_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
const ZIP_CODE_REGEX = /^[0-9\-]+$/
const MIN_LENGTH = 3

const Cart = () => {
  const { formatMessage } = useIntl()
  const router = useRouter()

  const [selectedMinifig, setSelectedMinifig] = useState<Minifig>()
  const [selectedMinifigParts, setSelectedMinifigParts] = useState<Array<MinifigPart>>([])

  useEffect(() => {
    const sessionSelectedMinifig = JSON.parse(sessionStorage.getItem(process.env.NEXT_PUBLIC_SELECTED_MINIFIG_SESSION_STORAGE_KEY as string) ?? "null") as Minifig
    if (sessionSelectedMinifig) {
      setSelectedMinifig(sessionSelectedMinifig)
      fetch(`/api/getMinifigParts?setNum=${sessionSelectedMinifig.set_num}`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson?.error) {
            showToast(formatMessage({ id: "cart.summary.parts.loading.error" }), "error")
          } else setSelectedMinifigParts(responseJson?.data)
        })
    }
  }, [formatMessage])

  const submit = (data: Object) => {
    fetch("api/submitOrder", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        minifigId: selectedMinifig?.set_num,
        recipient: data 
      })
    }).then((response) => {
      if (response.ok) {
        showToast(formatMessage({ id: "cart.submitted.success" }), "success", () => router.push("/"))
      } else {
        showToast(formatMessage({ id: "cart.submitted.failure" }), "error")
      }
    })
  }

  const { handleSubmit, register, formState: { errors } } = useForm()

  return (
    <div className={styles.container}>
      <Head>
        <title>{formatMessage({ id: "cart.title" })}</title>
        <meta name="description" content={formatMessage({ id: "app.description" })} />
        <link rel="icon" href="/lego-head.jpeg" />
      </Head>
      <main>
        <form onSubmit={handleSubmit(submit)} className={styles.container}>
          <div className={styles.shippingDetails}>
            <h1>
              <FormattedMessage id="cart.shippingDetails.title" />
            </h1>
            <div className={styles.form}>
              <div className={styles.div1}>
                <label htmlFor="name" className="required-field">
                  <FormattedMessage id="cart.shippingDetails.name" />
                </label>
                <input
                  {...register("name", { required: formatMessage({ id: "validation.required" }) })}
                  id="name"
                  placeholder={formatMessage({ id: "cart.shippingDetails.name" })}
                />
                <ValidationError error={errors?.name?.message as string} />
              </div>
              <div className={styles.div2}>
                <label htmlFor="surname" className="required-field">
                  <FormattedMessage id="cart.shippingDetails.surname" />
                </label>
                <input
                  {...register("surname", { required: formatMessage({ id: "validation.required" }) })}
                  id="surname"
                  placeholder={formatMessage({ id: "cart.shippingDetails.surname" })}
                />
                <ValidationError error={errors?.surname?.message as string} />
              </div>
              <div className={styles.div3}>
                <label htmlFor="phoneNumber">
                  <FormattedMessage id="cart.shippingDetails.phoneNumber" />
                </label>
                <input
                  {...register("phoneNumber", {
                    validate: (value) => PHONE_NUMBER_REGEX.test(value) || formatMessage({ id: "validation.invalidPhoneNumber" })
                  })}
                  type="tel"
                  id="phoneNumber"
                  placeholder={formatMessage({ id: "cart.shippingDetails.phoneNumber" })}
                />
                <ValidationError error={errors?.phoneNumber?.message as string} />
              </div>
              <div className={styles.div4}>
                <label htmlFor="email" className="required-field">
                  <FormattedMessage id="cart.shippingDetails.email" />
                </label>
                <input
                  {...register("email", {
                    required: formatMessage({ id: "validation.required" }),
                    validate: (value) => validate(value) || formatMessage({ id: "validation.invalidEmail" })
                  })}
                  type="tel"
                  id="email"
                  placeholder={formatMessage({ id: "cart.shippingDetails.email" })}
                />
                <ValidationError error={errors?.email?.message as string} />
              </div>
              <div className={styles.div5}>
                <label htmlFor="dateOfBirth">
                  <FormattedMessage id="cart.shippingDetails.dateOfBirth" />
                </label>
                <input
                  {...register("dateOfBirth", {
                    max: {
                      value: Date(),
                      message: formatMessage({ id: "validation.futureDate"})
                    }
                  })}
                  type="date"
                  id="dateOfBirth"
                  placeholder={formatMessage({ id: "cart.shippingDetails.dateOfBirth" })}
                />
                <ValidationError error={errors?.dateOfBirth?.message as string} />
              </div>
              <div className={styles.div6}>
                <label htmlFor="address" className="required-field">
                  <FormattedMessage id="cart.shippingDetails.address" />
                </label>
                <input
                  {...register("address", {
                    required: formatMessage({ id: "validation.required" }),
                    minLength: {
                      value: MIN_LENGTH,
                      message: formatMessage({ id: "validation.tooShort" }, { minLength: MIN_LENGTH })
                    }
                  })}
                  id="address"
                  placeholder={formatMessage({ id: "cart.shippingDetails.address" })}
                />
                <ValidationError error={errors?.address?.message as string} />
              </div>
              <div className={styles.div7}>
                <label htmlFor="city" className="required-field">
                  <FormattedMessage id="cart.shippingDetails.city" />
                </label>
                <input
                  {...register("city", {
                    required: formatMessage({ id: "validation.required" }),
                    minLength: {
                      value: MIN_LENGTH,
                      message: formatMessage({ id: "validation.tooShort" }, { minLength: MIN_LENGTH })
                    }
                  })}
                  id="city"
                  placeholder={formatMessage({ id: "cart.shippingDetails.city" })}
                />
                <ValidationError error={errors?.city?.message as string} />
              </div>
              <div className={styles.div8}>
                <label htmlFor="state" className="required-field">
                  <FormattedMessage id="cart.shippingDetails.state" />
                </label>
                <input
                  {...register("state", {
                    required: formatMessage({ id: "validation.required" }),
                    minLength: {
                      value: MIN_LENGTH,
                      message: formatMessage({ id: "validation.tooShort" }, { minLength: MIN_LENGTH })
                    }
                  })}
                  id="state"
                  placeholder={formatMessage({ id: "cart.shippingDetails.state" })}
                />
                <ValidationError error={errors?.state?.message as string} />
              </div>
              <div className={styles.div9}>
                <label htmlFor="zipCode" className="required-field">
                  <FormattedMessage id="cart.shippingDetails.zipCode" />
                </label>
                <input
                  {...register("zipCode", {
                    required: formatMessage({ id: "validation.required" }),
                    minLength: {
                      value: MIN_LENGTH,
                      message: formatMessage({ id: "validation.tooShort" }, { minLength: MIN_LENGTH })
                    },
                    validate: (value) => ZIP_CODE_REGEX.test(value) || formatMessage({ id: "validation.invalidZipCode" })
                  })}
                  id="zipCode"
                  placeholder={formatMessage({ id: "cart.shippingDetails.zipCode" })}
                />
                <ValidationError error={errors?.zipCode?.message as string} />
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <h1 style={{ color: "black" }}>
              <FormattedMessage id="cart.summary.title" />
            </h1>
            {selectedMinifig && (
              <>
                <div className={styles.image}>
                  <Image
                    alt={selectedMinifig.name}
                    src={selectedMinifig?.set_img_url ?? "/minifig-fallback.webp"}
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                    fill
                  />
                </div>
                <p>{selectedMinifig.name}</p>
              </>
            )}
            <div className={styles.parts}>
              <p>
                <FormattedMessage id="cart.summary.parts" values={{ partsCount: selectedMinifig?.num_parts }} />
              </p>
              {selectedMinifigParts?.length ? selectedMinifigParts.map((minifigPart) => (
                <div key={minifigPart.part_num} className={styles.part}>
                  <Image alt={minifigPart.part_num} src={minifigPart.part_img_url} width="100" height="100" />
                  <div className={styles.partDetails}>
                    <p>{minifigPart.name}</p>
                    <p className={styles.partNumber}>{minifigPart.part_num}</p>
                  </div>
                </div>
              )) : <LoaderWithMessage messageId="cart.summary.parts.loading" textColor="black" isVisible />}
            </div>
            <button type="submit" className={styles.submit} disabled={!!Object.entries(errors).length}>
              <FormattedMessage id="cart.button" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Cart