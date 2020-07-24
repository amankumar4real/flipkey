import React from 'react';

const CovidBanner=()=>{
    const style={
        fontColor:{color:"#ed6100"},
        bg:{background:"#faf1ed"},
        padding:{padding:0, margin:0}
    }
    return(
        <div>
            <div class="alert" style={style.bg, style.padding} role="alert">
                <h5 style={{...style.fontColor,...style.padding}}>COVID-19 Update</h5>
                <small style={style.padding} className='text-muted'>
                The impact of COVID-19 on travel is unprecedented. Like you, we’re monitoring the situation. Rest assured, we’re here to help with questions about your plans. Learn more here: 
                <a href='https://helpcenter.flipkey.com/faq/view/About-the-coronavirus-outbreak-COVID-19'target="_blank" style={style.fontColor}><u> About the coronavirus outbreak (COVID-19)</u></a>
                </small>
            </div>
        </div>
    )
}
export default CovidBanner;