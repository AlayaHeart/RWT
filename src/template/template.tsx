import * as React from "react";

type Props = {
    Props1: string;
};

type State = {
    State1: string;
};

type Snapshot = {
    scrollHeight: number
}


const Count: React.FunctionComponent<Props> = (props) => {
    return <h1>{props.Props1}</h1>;
};


/**
 * React Lifecycle function 執行流程圖： http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
 * 
 * 繼承 1. React.Component<Props, States>
 *     2. React.PureComponent<Props, States>
 *     3. React.FunctionComponent
 */
class templateSimple extends React.Component<Props, State, Snapshot> {

    // 設置初始屬性
    static defaultProps =  
    {
		color: 'blue',
		type: 'button'
    }
    
    state : Readonly<State> = 
    {
        State1 : ''
    }


    /**
     * Start Mounting - 1. 掛載執行的第一步 function (建構式)
     * NOTE 原本適合設置元件 state 的初始值，但自 16.3.0 更新之後此動作轉移至 getDerivedStateFromProps 比較適合
     * 
     * TODO Before Mounting action -> (None)
     * TODO After  Mounting action -> getDerivedStateFromProps
     * @param props 
     */
    public constructor(props: Props)   
    {
        super(props);
        console.log("constructor", props);  
    }

    /**
     * Mounting - 2. 再 constructor 建構函式執行之後
     * Start Updating - 1. 再 New props、set­State()、force­Update() 之後執行
     * 由取得新的 props 來設定自身的 state
     * 
     * TODO Before Mounting action -> constructor
     * TODO After  Mounting action -> render
     * 
     * TODO Before Updating action -> (None)
     * TODO After  Updating action -> shouldComponentUpdate
     * @param props 
     * @param state 
     */
    public static getDerivedStateFromProps(props: Props, state: State) : Partial<State> | null
    {
        state.State1 = '123';
        console.log("getDerivedStateFromProps", props, state);  
        return { State1 : '錯誤訊息設定' };
    }


    /**
     * Updating - 2. 再 getDerivedStateFromProps 之後執行
     * 決定是否要更新，若是 true 會執行 render，若是 false 則不會執行並即刻停止。
     * 
     * TODO Before Updating action -> getDerivedStateFromProps
     * TODO After  Updating action -> render
     * @param nextProps 
     * @param nextState 
     */
    public shouldComponentUpdate(nextProps: Props, nextState: State) : boolean
    {  
        console.log("shouldComponentUpdate", nextProps, nextState);  
        return true;
    }


    /**
     * Mounting - 3. 再 getDerivedStateFromProps 更新完 state 之後執行
     * Updating - 3. 再 shouldComponentUpdate 傳回 true 後確定要更新之後執行  
     * 該元件的 html 組成內容
     * 
     * TODO Before Mounting action -> getDerivedStateFromProps
     * TODO After  Mounting action -> componentDidMount
     * 
     * TODO Before Updating action -> shouldComponentUpdate
     * TODO After  Updating action -> getSnapshotBeforeUpdate
     */
    public render() : React.ReactNode
    {
        console.log("render", this.state, this.props);
      return <div>Hello</div>;
    }


    /**
     * Updating - 4. 再 render 之後，render 的結果到 DOM 之前時呼叫
     * 
     * TODO Before Updating action -> render
     * TODO After  Updating action -> componentDidUpdate
     * 
     * @param prevProps 
     * @param prevState 
     */
    public getSnapshotBeforeUpdate(prevProps: Props, prevState: State) 
    {
        console.log("getSnapshotBeforeUpdate", prevProps, prevState);
        return { scrollHeight: 10 }
    }


    /** 正式將 render 的結果 output 到 DOM 和 refs 上 
     *  以下 function 都是更新完之後執行
    */

    // 

    /**
     * Ending Mounting - 4. 再 render 完畢之後執行，結束 Mounting 掛載的生命週期
     * 
     * TODO Before Updating action -> render
     * TODO After  Updating action -> (NONE) 
     */
    public componentDidMount() : void
    {
        console.log("componentDidMount");
    }


    /**
     * Ending Updating - 5. 再 render 完畢之後執行，結束 Updating 更新的生命週期
     * 
     * TODO Before Updating action -> getSnapshotBeforeUpdate
     * TODO After  Updating action -> (NONE)
     * 
     * @param prevProps 
     * @param prevState 
     * @param snapshot 
     */
    public componentDidUpdate(prevProps: Props, prevState: State, snapshot: Snapshot) : void
    {
        console.log("componentDidUpdate", prevProps, prevState, snapshot);
    }


    /**
     * Starting & Ending Unmounting - 1 再移除 DOM "之前" 時被呼叫 
     * 
     * TODO Before Unmounting action -> (NONE)
     * TODO After  Unmounting action -> (NONE)
     */
    public componentWillUnmount() : void
    {
        console.log("componentWillUnmount");
    }



    /**
     * 錯誤邊界：當 child Component 發生 render 錯誤的時候會被此父元件捕捉到處理
     * @param error 錯誤訊息物件
     */
    public static getDerivedStateFromError(error: any) : Partial<State> | null
    {
        console.error("getDerivedStateFromError", error);
        return { State1 : '錯誤訊息設定' };
    }

    /**
     * 
     * @param error 
     * @param info 
     */
    public componentDidCatch(error: Error, info: React.ErrorInfo) : void
    {
        console.error("componentDidCatch", error, info);
    }



}