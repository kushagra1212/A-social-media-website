import Styles from "./Loader.module.css";
const Loader=()=>{

    return(
        <div className={Styles.windows8}>
	<div className={Styles.wBall} id={Styles.wBall_1}>
		<div className={Styles.wInnerBall}></div>
	</div>
	<div className={Styles.wBall} id={Styles.wBall_2}>
		<div className={Styles.wInnerBall}></div>
	</div>
	<div className={Styles.wBall} id={Styles.wBall_3}>
		<div className={Styles.wInnerBall}></div>
	</div>
	<div className={Styles.wBall} id={Styles.wBall_4}>
		<div className={Styles.wInnerBall}></div>
	</div>
	<div className={Styles.wBall} id={Styles.wBall_5}>
		<div className={Styles.wInnerBall}></div>
	</div>
</div>
    )
}

export default Loader;