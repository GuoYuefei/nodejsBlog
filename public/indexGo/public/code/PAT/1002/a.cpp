#include<iostream>

using namespace std;
int m_value = 1;
 
void func(int *p)
{
  //*p = m_value;	//会影响到外部的值
  p = &m_value;		//不会影响到外部的值
}
 
int main(int argc, char *argv[])
{
  int n = 2;
  int *pn = &n;
  cout << *pn << endl;
  func(pn);
  cout << *pn <<endl;
  return 0;
}
