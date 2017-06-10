/*
 * client.cpp
 *
 *  Created on: 2017年5月18日
 *      Author: Administrator
 */
#include<iostream>
#include"BinaryTree.h"

using namespace std;
class MyNode:public Node{
public:
	MyNode(int d):Node(d){
	}
	virtual void printData(){				//重写Node的printData的方法（其实父类中也没实现该方法）；
		cout << this->data << "\t";
	}
};

int main(){
//	int n=0;
//	cin >> n;
//	int* arr = new int[n];
//	for(int i = 0;i<n;i++){
//		cin >> arr[i];
//	}
	int n =7;
	int arr[7]={0,1,2,3,4,5,6};
	BinaryTree& t = *new BinaryTree(new MyNode(n));
	for(int i = 0;i < n;i++){
		MyNode* nd = new MyNode(*(arr+i));		//数组遍历成为node后调用appendNode存放
		t.appendNode(nd);
	}

	t.preorder_traversal();
	cout << "<<<<这是前序遍历"<<endl;
	t.inorder_traversal();
	cout << "<<<<这是中序遍历"<<endl;
	t.subsequent_traversal();
	cout << "<<<<这是后续遍历"<<endl;

	cout << "*************************非递归函数测试*************************"<<endl;
	t.level_traversal();
	cout << "<<<<这是层次遍历"<<endl;
	t.preorder_stack();
	cout << "<<<<这是非递归方式的前序遍历"<<endl;
	t.inorder_stack();
	cout << "<<<<这是非递归方式的中序遍历"<<endl;
	t.subsequent_stack();
	cout << "<<<<这是非递归方式的后序遍历"<<endl;


	return 0;
}


