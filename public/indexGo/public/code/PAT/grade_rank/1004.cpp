/**
 * 成绩排名
 */
#include<iostream>
#include<string>

using namespace std;

class student{			//其实就是struct
public:
	string name;
	string number;
	int grade;
};

//其主要逻辑的类
class GradeRank{
private:
	int n;
	student* stu;

	student findMax(){
		//默认stu[0]的grade最大
		student max = stu[0];
		for(int i=1;i<n;i++){
			if(max.grade<stu[i].grade){
				max = stu[i];
			}
		}
		return max;
	}

	student findMin(){
		student min = stu[0];
		for(int i=1;i<n;i++){
			if(min.grade>stu[i].grade){
				min = stu[i];
			}
		}
		return min;
	}
public:
	//必须要默认构造
	GradeRank():n(0),stu(0){

	}

	GradeRank(int amount):n(amount),stu(new student[n]){

	}
	//如果是静态数组的话可以用 比如 int (&intarr)[10]是数组引用   如果是 int &intarr[10]就是引用的数组是非法的
	void input(){			//n记录学生数量，事先知道
		for(int i=0;i<n;i++){
			cin >> (stu+i)->name;			//将输入数据记录到stu中
			cin >> (stu+i)->number;
			cin >> (stu+i)->grade;
		}
	}

	void output(){
		student max = findMax();
		student min = findMin();
		cout << max.name <<" "<<max.number<<endl;
		cout << min.name << " " << min.number <<endl;
	}


};


int main(){
	int n = 0;			//接收并记录输入的数据量
	cin >> n;

	GradeRank gr(n);
	gr.input();
	gr.output();


	return 0;
}

