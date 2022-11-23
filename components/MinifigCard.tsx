import Image from "next/image"
import Link from "next/link"
import { FormattedMessage } from "react-intl"
import { Minifig } from "../interfaces"
import styles from '../styles/MinifigCard.module.css'

interface MinifigCardProps {
  minifig: Minifig
  isSelected: boolean
  onClick: (minifig: Minifig) => void
}

const MinifigCard = ({ minifig, isSelected, onClick }: MinifigCardProps) => (
  <div className={`${styles.card} ${isSelected ? styles.selected : ""}`} onClick={() => onClick(minifig)}>
    <div className={styles.image}>
      <Image
        alt={minifig.name}
        src={minifig?.set_img_url ?? "/minifig-fallback.webp"}
        placeholder="blur"
        blurDataURL="/placeholder.jpg"
        fill
      />
    </div>
    <p>{minifig.name}</p>
    <Link href={minifig.set_url} passHref legacyBehavior>
      <a onClick={(event) => event.stopPropagation()} target="_blank" className={styles.link}>
        <FormattedMessage id="draw.showDetails" />
      </a>
    </Link>
  </div>
)

export default MinifigCard