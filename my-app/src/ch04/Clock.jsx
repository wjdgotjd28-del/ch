function Clock(props) {
    return(
        <div>
            <h1>안녕, 이액트!</h1>
            <h2>현재 시간: {new Date().toLocaleTimeString()}</h2>
        </div>
    )
}

export default Clock;