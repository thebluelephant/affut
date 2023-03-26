import { FC } from 'react';
import { Product } from '../../../services/typing/product.interface';
import { Check } from '../../../styles/icons/check';
import Button from '../../shared/button/button';
import styles from './ProductCard.module.scss';


type ProductCardProps = {
    product: Product
    onSubscription : (priceId : string) => void
}

const ProductCard: FC<ProductCardProps> = ({ product, onSubscription }) => {
  return (
    <div className={`${styles.productCard}`}>
      <div className={styles['productCard__details']}>
        <p className={`${styles.price}`}>{product.price}</p>
        <p className={`${styles.title}`}>{product.title}</p>
      </div>
      <ul className={styles['productCard__advantages']}>
        {product.advantages.map((advantage, key) => 
          <div className={styles.advantage} key={key}> 
            <Check color="green" />
            <li >{advantage}</li>
          </div>)}
      </ul>
      <div className={styles['productCard__button']}>
        <Button title={'Souscrire'} type={'primary'} onButtonClick={() => onSubscription(product.priceId)} />
      </div>
      
     
    </div>
  )
};

export default ProductCard;