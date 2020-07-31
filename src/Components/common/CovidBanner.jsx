import React from 'react';

const CovidBanner=()=>{
    const style={
        fontColor:{color:"#ed6100"},
        bg:{background:"#faf1ed"},
        padding:{padding:0, margin:0},
        color:{color:'black'},
        fontS:{fontSize:14},
        borderBtm:{ borderBottom: 'solid 2px #e57618'}
    }
    return(
        <div>
            <div className="alert pb-2" style={{...style.bg, ...style.padding, ...style.borderBtm}} role="alert">
                <h5 style={{...style.fontColor,...style.padding}}>COVID-19 Update</h5>
                <p style={{...style.padding, ...style.color, ...style.fontS}}>
                The impact of COVID-19 on travel is unprecedented. Like you, we’re monitoring the situation. Rest assured, we’re here to help with questions about your plans. Learn more here: 
                <a href='https://helpcenter.flipkey.com/faq/view/About-the-coronavirus-outbreak-COVID-19'target="_blank" style={style.fontColor}><u> About the coronavirus outbreak (COVID-19)</u></a>
                </p>
            </div>
        </div>
    )
}
export default CovidBanner;