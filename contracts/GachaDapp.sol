// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract GachaDapp{
    
    event MyItemList(string[] _Items, uint _totalCount);

string[] private ItemList = ["Item1","Item2","Item3","Item4","Item5","Item6","Item7","Item8","Item9","Item10"];

struct info{
    string[] Items;
    uint gachaCount;
    uint totalCount;
}

mapping(address => info) public userInfo;

function randFunc() internal view returns(uint){
uint randomnumber = uint(keccak256(abi.encodePacked(msg.sender,block.timestamp))) % 10;
return randomnumber;
}

function payFunc (uint _funcFee, info storage _Myinfo) internal {
if(msg.value ==_funcFee){
   _Myinfo.Items.push(ItemList[randFunc()]);
   _Myinfo.totalCount++;
    } else {
        revert();
    }
 }

function test() public payable {
info storage Myinfo = userInfo[msg.sender];
uint funcFee;
if(Myinfo.gachaCount == 5){
    funcFee=0;
    payFunc(funcFee,Myinfo);
Myinfo.gachaCount =0;
   } else {
    funcFee=500;
    payFunc(funcFee,Myinfo);
        Myinfo.gachaCount++;
}

}

function callresult() public {
 info memory result = userInfo[msg.sender];
    emit MyItemList(result.Items,result.totalCount);
}

}