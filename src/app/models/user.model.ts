export class User{
  constructor(
    private expiration: Date,
    public type: string,
    public user_id: number,
    private value: string

  ){}

  get Token(){
    if(!this.expiration || new Date() > this.expiration){
      return null
    }

    return this.value
  }


}
