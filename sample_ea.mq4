int start() {
   double price = Ask;
   int spread = MarketInfo(Symbol(), MODE_SPREAD);
   int ticket = OrderSend(Symbol(), OP_BUY, 0.1, Ask, 3, 0, 0, "auto", 0, 0, clrBlue);
   return(0);
}
