import '../css/Market.css';

function InfoBox(props){
  
  return (
    <div>
    <img class="question-viewer" src={props.code}/>
    </div>
  )
}

function Market() {
  return (
    <div className="Market">
        <InfoBox class="info-box" code="test.jpeg"/>
    </div>
  );
}

export default Market;
