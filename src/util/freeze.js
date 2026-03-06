
const freeWay={
    methods: {
        freezeArray(free){
            try {
                if(free.length>0){
                    free.forEach((item)=>{
                        Object.freeze(item);
                    })
                } 
            } catch (error) {
                new Error("冻结数组异常",error)
            }
        },
        freezeObject(free){
            try {
                Object.freeze(free);
            } catch (error) {
                new Error("冻结对象异常",error)
            }
           
           
        }

      }
}

export default freeWay;

