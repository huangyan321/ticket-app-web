/** @format */

class Responser {
  fail(err = {}, msg = '操作失败', errorCode = 10001) {
    return {
      msg,
      err,
      errorCode,
    };
  }

  success(msg = 'success', errorCode = 0, code = 200) {
    return {
      msg,
      code,
      errorCode,
    };
  }

  json(data: any, msg = 'success', errorCode = 0, code = 200) {
    return {
      code,
      msg,
      errorCode,
      data,
    };
  }
}

export { Responser };
