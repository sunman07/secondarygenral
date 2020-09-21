import axios from '@/lib/fetch';
import { stringify } from 'qs';
const baseUrl = '/apartment';
const baseLink = '/secondclassroom';

//每个班级学院进度
export const getProgressAllAcademy = params => {
  return axios
    .get(
      baseLink +
        `/api/v1/scoreprogress/queryprogress?Page=${params.Page}&PageCount=${params.PageCount}&AcademicYearCode=${params.AcademicYearCode}&AcademicTermCode=${params.AcademicTermCode}&StudentType=${params.StudentType}&GradeCode=${params.GradeCode}&AcademyCode=${params.AcademyCode}`,
      params,
    )
    .then(res => {
      return res;
    });
};

//整体进度
export const getProgressWithAll = params => {
  return axios
    .get(
      baseLink +
        `/api/v1/scoreprogress/getprogress?AcademicYearCode=${params.AcademicYearCode}&AcademicTermCode=${params.AcademicTermCode}&StudentType=${params.StudentType}&GradeCode=${params.GradeCode}&AcademyCode=${params.AcademyCode}`,
      params,
    )
    .then(res => {
      return res;
    });
};
//导出学分
export const exportAcquireData = params => {
  return axios
    .getblob({
      url:
        baseLink +
        `/api/v1/scoredataview/exportcreditdata?AcademicYearCode=${params.AcademicYearCode}&AcademicTermCode=${params.AcademicTermCode}&AcademyCode=${params.AcademyCode}&GradeCode=${params.GradeCode}&ClassCode=${params.ClassCode}&StudentType=${params.StudentType}&StuUserCode=${params.StuUserCode}&StuName=${params.StuName}`,
      method: 'get',
      data: {},
      responseType: 'blob',
    })
    .then(res => {
      return res;
    });
};
//导出积分 /api/v1/scoredataview/exportintegraldata
export const exportIntegralData = params => {
  return axios
    .getblob({
      url:
        baseLink +
        `/api/v1/scoredataview/exportintegraldata?AcademicYearCode=${params.AcademicYearCode}&AcademicTermCode=${params.AcademicTermCode}&AcademyCode=${params.AcademyCode}&GradeCode=${params.GradeCode}&ClassCode=${params.ClassCode}&ModuleCode=${params.ModuleCode}&ItemCode=${params.ItemCode}&StandardCode=${params.StandardCode}&StuUserCode=${params.StuUserCode}&StuName=${params.StuName}&StartDate=${params.StartDate}&EndDate=${params.EndDate}`,
      method: 'get',
      data: {},
      responseType: 'blob',
    })
    .then(res => {
      return res;
    });
};
/* export const exportIntegralData = () => {
  return axios.get(baseLink+`/api/v1/scoredataview/exportintegraldata`).then(res => {
    return res;
  });
}; */

//获取学生类型
export const getStudentsWithTerm = () => {
  return axios.get(`/core/api/v1/bizcode?code_type=studenttype`).then(res => {
    return res;
  });
};

//学分查看列表/api/v1/scoredataview/creditdata
export const getCreditsOfEntry = params => {
  return axios
    .get(
      baseLink +
        `/api/v1/scoredataview/creditdata?Page=${params.Page}&PageCount=${params.PageCount}&AcademicYearCode=${params.AcademicYearCode}&AcademicTermCode=${params.AcademicTermCode}&AcademyCode=${params.AcademyCode}&GradeCode=${params.GradeCode}&ClassCode=${params.ClassCode}&StudentType=${params.StudentType}&StuUserCode=${params.StuUserCode}&StuName=${params.StuName}`,
    )
    .then(res => {
      return res;
    });
};

//积分查看列表
export const getScoreOfEntry = params => {
  return axios
    .get(
      baseLink +
        `/api/v1/scoredataview/integraldata?Page=${params.Page}&PageCount=${params.PageCount}&AcademicYearCode=${params.AcademicYearCode}&AcademicTermCode=${params.AcademicTermCode}&AcademyCode=${params.AcademyCode}&GradeCode=${params.GradeCode}&ClassCode=${params.ClassCode}&ModuleCode=${params.ModuleCode}&ItemCode=${params.ItemCode}&StandardCode=${params.StandardCode}&StuUserCode=${params.StuUserCode}&StuName=${params.StuName}&StartDate=${params.StartDate}&EndDate=${params.EndDate}`,
    )
    .then(res => {
      return res;
    });
};
//获取学年 学期
export const getGradeWithTerm = params => {
  return axios
    .get(`/core/api/v1/bizcode?code_type=${params.code_type}`, params)
    .then(res => {
      return res;
    });
};

//获取责任院系
export const getMangerAcademy = () => {
  return axios.get(`/core/api/v1/user/staffroledept?RoleGroup=2`).then(res => {
    return res;
  });
};
//获取主列表
export const getMainEntry = params => {
  return axios
    .get(
      baseLink +
        `/api/v1/scoreapprove/queryscoreapprove?ApprovalStatus=${
          params.ApprovalStatus
        }&Page=${params.Page}&PageCount=${
          params.PageCount
        }&ClassCode=${params.ClassCode ||
          ''}&StuUserCode=${params.StuUserCode ||
          ''}&StuName=${params.StuName || ''}&ModuleCode=${params.ModuleCode ||
          ''}&ItemCode=${params.ItemCode ||
          ''}&StandardCode=${params.StandardCode || ''}`,
    )
    .then(res => {
      return res;
    });
};
//获取系统参数 确定当前角色获取学年/学期范围 /proxy/v1/core/api/v1/systemparams/get
export const getSystemOfParameter = () => {
  return axios
    .get(
      `/core/api/v1/systemparams/getp?SGroup=SecondClass&SType=SecondClassConvert&VName=SecondClassConvert`,
    )
    .then(res => {
      return res;
    });
};
//获取学年学期
export const getTermAllClass = params => {
  return axios
    .get(`/core/api/v1/bizcode?code_type=${params[0]}&code_type=${params[1]}`)
    .then(res => {
      return res;
    });
};
//获取责任班级
export const getMangerClass = () => {
  return axios.get(`/core/api/v1/user/staffroledept?RoleGroup=3`).then(res => {
    return res;
  });
};
//审批成绩
export const getApproveScore = params => {
  return axios
    .post(baseLink + `/api/v1/scoreapprove/approvescore`, params)
    .then(res => {
      return res;
    });
};
// 获取年级
export const getGrade = query => {
  return axios.get(baseUrl + `/api/v2/grade?${stringify(query)}`).then(res => {
    return res;
  });
};
// 获取标准列表
export const getConfigEntry = params => {
  return axios
    .post(baseLink + `/api/v1/standard/querystandard`, params)
    .then(res => {
      return res;
    });
};
// 获取模块字典
export const getModuleDic = () => {
  return axios.get(`/core/api/v1/bizcode?code_type=secondclass`).then(res => {
    return res;
  });
};
//获取项目字典
export const getObjectDic = params => {
  return axios
    .get(baseLink + `/api/v1/standard/queryitemnopag?ModuleCode=${params}`)
    .then(res => {
      return res;
    });
};
//获取标准字典
export const getStandardsDic = params => {
  return axios
    .get(baseLink + `/api/v1/standard/querystandardnopag?ItemCode=${params}`)
    .then(res => {
      return res;
    });
};
