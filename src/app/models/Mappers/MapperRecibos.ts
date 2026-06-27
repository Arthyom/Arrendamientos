import { Recibo } from "../Entities/recibo";

export class MapperRecibos {

  public static extractRecipientFileName ( recipient?: Recibo){
    const now = new Date();

    if(recipient)
      return `${now.toLocaleDateString()}-${recipient.concepto}.pdf`;

    return 'recibo'+now.toLocaleDateString() + '.pdf';
  }

}
