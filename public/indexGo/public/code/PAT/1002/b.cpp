#include<iostream>

using namespace std;


void f(int* d){
	
	d[0] = 23;
}



int main(){
	int data[3] = {0};
	f(data);
	cout << data[0] <<endl;



}
